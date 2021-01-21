defmodule SlcWeb.AdController do
  use SlcWeb, :controller

  alias Slc.{Ads, Utils}
  alias Slc.Ads.Ad
  alias Slc.Users.User
  alias Slc.Auth.Guardian
  action_fallback SlcWeb.FallbackController

  def create(conn, %{"ad" => %{"location" => location} = ad_params}) do
    with {:ok, %User{} = user} <- Guardian.Plug.current_resource(conn),
         {:ok, location_map} <- Utils.frame_location(location),
         {:ok, %Ad{} = ad} <- Ads.create_ad(user, Map.put(ad_params, "location", location_map)) do
      conn
      |> put_status(:created)
      |> render("show.json", ad: ad)
    end
  end

  def active_ads(conn, _params) do
    ads = Ads.list_active_ads()
    render(conn, "index.json", ads: ads)
  end

  def active_ad(conn, %{"id" => id}) do
    with {:ok, %Ad{} = ad} <- Ads.get_active_ad(id) do
      render(conn, "show.json", ad: ad)
    end
  end

  def all_ads(conn, _params) do
    with {:ok, %User{}} <- Guardian.Plug.current_resource(conn) do
      ads = Ads.list_ads()
      render(conn, "index.json", ads: ads)
    end
  end

  def show(conn, %{"id" => id}) do
    with {:ok, %User{}} <- Guardian.Plug.current_resource(conn),
         {:ok, %Ad{} = ad} <- Ads.get_ad(id) do
      render(conn, "show.json", ad: ad)
    end
  end

  def update(conn, %{"id" => id, "ad" => ad_params}) do
    with {:ok, %User{}} <- Guardian.Plug.current_resource(conn),
         %Ad{} = ad <- Ads.get_ad!(id),
         {:ok, %Ad{} = ad} <- Ads.update_ad(ad, ad_params) do
      render(conn, "show.json", ad: ad)
    end
  end

  def delete(conn, %{"id" => id}) do
    with {:ok, %User{}} <- Guardian.Plug.current_resource(conn),
         %Ad{} = ad <- Ads.get_ad!(id),
         {:ok, %Ad{}} <- Ads.delete_ad(ad) do
      send_resp(conn, :no_content, "")
    end
  end
end
