defmodule SlcWeb.PageController do
  use SlcWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
