defmodule Slc.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :name, :string
      add :role, :string
      add :login_id, :string
      add :password_hash, :string

      timestamps()
    end

    create unique_index(:users, [:login_id])
  end
end
