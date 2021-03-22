defmodule Slc.Repo.Migrations.CreateAds do
  use Ecto.Migration

  def change do
    create table(:slc_ads, primary_key: false) do
      add :id, :serial, primary_key: true
      add :post_ad_id, :string
      add :post_by, :string
      add :type, :string
      add :brand, :string
      add :body_type, :string
      add :km_driven, :string
      add :model, :string
      add :variant, :string
      add :year, :string
      add :condition, :string
      add :fuel_type, :string
      add :transmission, :string
      add :no_of_owners, :string
      add :features, :map
      add :location, :map
      add :seller_name, :string
      add :seller_phone, :string
      add :seller_email, :string
      add :extra_notes, :text
      add :images, {:array, :map}
      add :asking_price, :string
      add :views, :integer, default: 0
      add :display_image_url, :text
      add :ad_status, :string
      add :ad_active_timestamp, :utc_datetime
      add :is_ad_active, :boolean, default: false, null: false

      add :user_id, references(:slc_users)
      timestamps()
    end
    execute "select setval(pg_get_serial_sequence('slc_ads', 'id'), 1000)"
  end
end
