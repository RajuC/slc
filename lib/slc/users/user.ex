defmodule Slc.Users.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :login_id, :string
    field :name, :string
    field :password_hash, :string
    field :role, :string

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :role, :login_id, :password_hash])
    |> validate_required([:name, :role, :login_id, :password_hash])
    |> unique_constraint(:login_id)
  end
end
