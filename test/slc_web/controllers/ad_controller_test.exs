defmodule SlcWeb.AdControllerTest do
  use SlcWeb.ConnCase

  alias Slc.Ads
  alias Slc.Ads.Ad

  @create_attrs %{
    ad_active_timestamp: "2010-04-17T14:00:00Z",
    ad_status: "some ad_status",
    asking_price: "some asking_price",
    body_type: "some body_type",
    brand: "some brand",
    condition: "some condition",
    display_image_url: "some display_image_url",
    features: [],
    fuel_type: "some fuel_type",
    images: [],
    is_ad_active: true,
    km_driven: "some km_driven",
    model: "some model",
    no_of_owners: "some no_of_owners",
    post_ad_id: "some post_ad_id",
    seller_details: [],
    transmission: "some transmission",
    type: "some type",
    variant: "some variant",
    views: 42,
    year: "some year"
  }
  @update_attrs %{
    ad_active_timestamp: "2011-05-18T15:01:01Z",
    ad_status: "some updated ad_status",
    asking_price: "some updated asking_price",
    body_type: "some updated body_type",
    brand: "some updated brand",
    condition: "some updated condition",
    display_image_url: "some updated display_image_url",
    features: [],
    fuel_type: "some updated fuel_type",
    images: [],
    is_ad_active: false,
    km_driven: "some updated km_driven",
    model: "some updated model",
    no_of_owners: "some updated no_of_owners",
    post_ad_id: "some updated post_ad_id",
    seller_details: [],
    transmission: "some updated transmission",
    type: "some updated type",
    variant: "some updated variant",
    views: 43,
    year: "some updated year"
  }
  @invalid_attrs %{ad_active_timestamp: nil, ad_status: nil, asking_price: nil, body_type: nil, brand: nil, condition: nil, display_image_url: nil, features: nil, fuel_type: nil, images: nil, is_ad_active: nil, km_driven: nil, model: nil, no_of_owners: nil, post_ad_id: nil, seller_details: nil, transmission: nil, type: nil, variant: nil, views: nil, year: nil}

  def fixture(:ad) do
    {:ok, ad} = Ads.create_ad(@create_attrs)
    ad
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all ads", %{conn: conn} do
      conn = get(conn, Routes.ad_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create ad" do
    test "renders ad when data is valid", %{conn: conn} do
      conn = post(conn, Routes.ad_path(conn, :create), ad: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.ad_path(conn, :show, id))

      assert %{
               "id" => id,
               "ad_active_timestamp" => "2010-04-17T14:00:00Z",
               "ad_status" => "some ad_status",
               "asking_price" => "some asking_price",
               "body_type" => "some body_type",
               "brand" => "some brand",
               "condition" => "some condition",
               "display_image_url" => "some display_image_url",
               "features" => [],
               "fuel_type" => "some fuel_type",
               "images" => [],
               "is_ad_active" => true,
               "km_driven" => "some km_driven",
               "model" => "some model",
               "no_of_owners" => "some no_of_owners",
               "post_ad_id" => "some post_ad_id",
               "seller_details" => [],
               "transmission" => "some transmission",
               "type" => "some type",
               "variant" => "some variant",
               "views" => 42,
               "year" => "some year"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.ad_path(conn, :create), ad: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update ad" do
    setup [:create_ad]

    test "renders ad when data is valid", %{conn: conn, ad: %Ad{id: id} = ad} do
      conn = put(conn, Routes.ad_path(conn, :update, ad), ad: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.ad_path(conn, :show, id))

      assert %{
               "id" => id,
               "ad_active_timestamp" => "2011-05-18T15:01:01Z",
               "ad_status" => "some updated ad_status",
               "asking_price" => "some updated asking_price",
               "body_type" => "some updated body_type",
               "brand" => "some updated brand",
               "condition" => "some updated condition",
               "display_image_url" => "some updated display_image_url",
               "features" => [],
               "fuel_type" => "some updated fuel_type",
               "images" => [],
               "is_ad_active" => false,
               "km_driven" => "some updated km_driven",
               "model" => "some updated model",
               "no_of_owners" => "some updated no_of_owners",
               "post_ad_id" => "some updated post_ad_id",
               "seller_details" => [],
               "transmission" => "some updated transmission",
               "type" => "some updated type",
               "variant" => "some updated variant",
               "views" => 43,
               "year" => "some updated year"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, ad: ad} do
      conn = put(conn, Routes.ad_path(conn, :update, ad), ad: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete ad" do
    setup [:create_ad]

    test "deletes chosen ad", %{conn: conn, ad: ad} do
      conn = delete(conn, Routes.ad_path(conn, :delete, ad))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.ad_path(conn, :show, ad))
      end
    end
  end

  defp create_ad(_) do
    ad = fixture(:ad)
    {:ok, ad: ad}
  end
end
