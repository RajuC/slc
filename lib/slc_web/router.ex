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

  scope "/api/v1", SlcWeb do
    pipe_through(:api)

    #### user apis

    post("/sign_in", UserController, :sign_in)
    post("/sign_up", UserController, :sign_up)
    post("/post_non_slc_ad", AdController, :create_non_slc_ad)

    ## display active ads (active)
    get("/listings/active", AdController, :active_ads)
    get("/listings/active/:id", AdController, :active_ad)

    get("/car_attributes", AttributesController, :car_attrs)
    get("/car_attributes/brands/:type", AttributesController, :car_attrs)
    get("/car_attributes/models/:type/:brand", AttributesController, :car_attrs)
    get("/car_attributes/variants/:type/:brand/:model", AttributesController, :car_attrs)

    get("/bike_attributes", AttributesController, :bike_attrs)
    get("/bike_attributes/brands/:type", AttributesController, :bike_attrs)
    get("/bike_attributes/models/:type/:brand", AttributesController, :bike_attrs)
  end

  scope "/api/v1", SlcWeb do
    pipe_through([:api, :jwt_authenticated])

    post("/post_slc_ad", AdController, :create_slc_ad)
    post("/update_ad", AdController, :update)
    ## display all listings (active and inactive)
    get("/listings", AdController, :all_ads)
    ## display all listings (active and inactive)
    get("/listings/:id", AdController, :show)
    post("/listings/:id/update", AdController, :update)
    delete("/listings/:id", AdController, :delete)

    #### user apis

    get("/users", UserController, :index)
    get("/users/:id", UserController, :show)
    get("/get_user", UserController, :get_user)
    post("/users/:id/update_details", UserController, :update_details)
    post("/users/:id/update_pwd", UserController, :update_password)
    delete("/users/:id", UserController, :delete)
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
