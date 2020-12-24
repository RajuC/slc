defmodule SlcWeb.UserView do
  use SlcWeb, :view
  alias SlcWeb.UserView

  def render("index.json", %{users: users}) do
    %{data: render_many(users, UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, UserView, "user.json")}
  end

  def render("user.json", %{user: user, token: token}) do
    %{
      id: user.id,
      name: user.name,
      role: user.role,
      login_id: user.login_id,
      token: token
    }
  end

  def render("user.json", %{user: user}) do
    %{
      id: user.id,
      name: user.name,
      role: user.role,
      login_id: user.login_id,
    }
  end

end
