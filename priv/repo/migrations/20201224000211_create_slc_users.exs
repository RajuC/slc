defmodule Slc.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:slc_users) do
      add :name, :string
      add :role, :string
      add :login_id, :string
      add :email, :string
      add :password_hash, :string

      timestamps()
    end

    create unique_index(:slc_users, [:login_id])
    create unique_index(:slc_users, [:email])
  end
end
