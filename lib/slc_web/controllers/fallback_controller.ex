defmodule SlcWeb.FallbackController do
  @moduledoc """
  Translates controller action results into valid `Plug.Conn` responses.

  See `Phoenix.Controller.action_fallback/1` for more details.
  """
  use SlcWeb, :controller

  def call(conn, {:error, %Ecto.Changeset{} = changeset}) do
    conn
    |> put_status(:unprocessable_entity)
    |> put_view(SlcWeb.ChangesetView)
    |> render("error.json", changeset: changeset)
  end

  def call(conn, {:error, :not_found}) do
    conn
    |> put_status(:not_found)
    |> put_view(SlcWeb.ErrorView)
    |> json(%{error: "not_found"})
  end

  def call(conn, {:error, :unauthorized}) do
    conn
    |> put_status(:unauthorized)
    |> json(%{error: "unauthorized"})
  end

  def call(conn, other) do
    other |> IO.inspect(label: "#{__ENV__.module}||#{inspect(__ENV__.function)}||L:#{__ENV__.line}||--------> Error unknown: " )
    conn
    |> put_status(:unauthorized)
    |> json(%{error: "unauthorized"})
  end

end
