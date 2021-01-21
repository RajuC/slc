defmodule SlcWeb.UserController do
  use SlcWeb, :controller

  alias Slc.Users
  alias Slc.Users.User
  alias Slc.Auth.Guardian
  action_fallback SlcWeb.FallbackController

  ## TBD need to add the bearer token auth to this route
  def index(conn, _params) do
    with {:ok, %User{}} <- Guardian.Plug.current_resource(conn) do
      users = Users.list_slc_users()
      render(conn, "index.json", users: users)
    end
  end

  def sign_up(conn, %{"user" => user_params}) do
    # with %User{} = userr <- Guardian.Plug.current_resource(conn),
    with {:ok, %User{} = user} <- Users.create_user(user_params),
         {:ok, token, _claims} <- Guardian.encode_and_sign(user) do
      # userr
      # |> IO.inspect(
      #   label:
      #     "#{__ENV__.module}||#{inspect(__ENV__.function)}||L:#{__ENV__.line}||--------> Userrr: "
      # )

      conn
      |> put_status(:created)
      |> render("user.json", %{user: user, token: token})
    end
  end

  def sign_in(conn, %{"login_id" => login_id, "password" => password}) do
    with {:ok, user, token} <- Users.token_sign_in_with_login_id(login_id, password) do
      conn
      |> put_status(:created)
      |> render("user.json", %{user: user, token: token})
    end
  end

  ## TBD will be removed after adding bearer token flow
  def show(conn, %{"id" => id}) do
    with {:ok, %User{}} <- Guardian.Plug.current_resource(conn),
         {:ok, %User{} = user} <- Users.get_user(id) do
      render(conn, "show.json", user: user)
    end
  end

  def get_user(conn, _params) do
    with {:ok, %User{} = user} <- Guardian.Plug.current_resource(conn) do
      conn |> render("user.json", %{user: user})
    end
  end

  def update_details(conn, %{"id" => id, "user" => user_params}) do
    with {:ok, %User{}} <- Guardian.Plug.current_resource(conn),
         %User{} = user <- Users.get_user!(id),
         {:ok, %User{} = mod_user} <- Users.update_user(user, user_params, :without_password) do
      render(conn, "show.json", user: mod_user)
    end
  end

  def update_password(conn, %{"id" => id, "user" => user_params}) do
    with {:ok, %User{}} <- Guardian.Plug.current_resource(conn),
         %User{} = user <- Users.get_user!(id),
         {:ok, %User{} = mod_user} <- Users.update_user(user, user_params, :with_password) do
      render(conn, "show.json", user: mod_user)
    end
  end

  def delete(conn, %{"id" => id}) do
    with {:ok, %User{}} <- Guardian.Plug.current_resource(conn),
         %User{} = user <- Users.get_user!(id),
         {:ok, %User{}} <- Users.delete_user(user) do
      send_resp(conn, :no_content, "")
    end
  end
end
