defmodule Slc.Users.User do
  use Ecto.Schema
  import Ecto.Changeset
  import Comeonin.Bcrypt, only: [hashpwsalt: 1]

  schema "slc_users" do
    field :login_id, :string
    field :name, :string
    field :password_hash, :string
    field :role, :string, default: "user"
    field :email, :string

    # Virtual fields
    field :password, :string, virtual: true
    timestamps()
  end

  @doc false
  def changeset_without_password(user, attrs) do
    user
    |> cast(attrs, [:name, :role, :login_id, :email])
    |> validate_required([:name, :role, :login_id, :email])
    |> unique_constraint(:login_id)
    |> unique_constraint(:email)
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :role, :login_id, :email, :password])
    |> validate_required([:name, :role, :login_id, :email, :password])
    |> unique_constraint(:login_id)
    |> unique_constraint(:email)
    |> validate_length(:login_id, min: 5) # Check that password length is >= 6
    |> validate_length(:password, min: 7) # Check that password length is >= 7
    |> put_password_hash # Add put_password_hash to changeset pipeline
  end

  defp put_password_hash(changeset) do
    case changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: pass}}
        ->
          put_change(changeset, :password_hash, hashpwsalt(pass))
      _ ->
          changeset
    end

  end
end
