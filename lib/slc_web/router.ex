defmodule SlcWeb.Router do
  use SlcWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :jwt_authenticated do
    plug(Slc.Auth.Pipeline)
  end

  scope "/api", SlcWeb do
    pipe_through(:api)

    #### user apis
    post("/sign_up", UserController, :sign_up)
    post("/sign_in", UserController, :sign_in)
    get("/users", UserController, :index)
    get("/user/:id", UserController, :show)
  end

  scope "/api/v1", SlcWeb do
    pipe_through([:api, :jwt_authenticated])

    # post("/post_ad", AdController, :create)


    #### user apis
    get("/get_user", UserController, :get_user)
    post("/user/update_details", UserController, :update_details)
    post("/user/update_pwd", UserController, :update_password)
    delete("/user", UserController, :delete)
  end

  scope "/", SlcWeb do
    pipe_through :browser

    get("/*path", PageController, :index)
  end

  # Other scopes may use custom stacks.
  # scope "/api", SlcWeb do
  #   pipe_through :api
  # end
end
