defmodule Slc.Ads.Ad do
  use Ecto.Schema
  import Ecto.Changeset

  schema "slc_ads" do
    field :ad_active_timestamp, :utc_datetime
    field :ad_status, :string, default: "Under Review"
    field :asking_price, :string
    field :brand, :string
    field :condition, :string
    field :features, :map
    field :fuel_type, :string
    field :images, {:array, :map}
    field :is_ad_active, :boolean, default: false
    field :km_driven, :string
    field :model, :string
    field :no_of_owners, :string
    field :post_ad_id, :string
    field :extra_notes, :string
    field :display_image_url, :string, default: "NA"
    field :body_type, :string, default: "NA"
    field :transmission, :string, default: "NA"
    field :variant, :string, default: "NA"
    field :type, :string
    field :views, :integer, default: 0
    field :year, :string
    field :location, :map
    field :seller_name, :string
    field :seller_phone, :string
    field :seller_email, :string

    belongs_to :user, Slc.Users.User

    timestamps()
  end

  @doc false
  def changeset(ad, attrs) do
    ad
    |> cast(attrs, [
      :post_ad_id,
      :type,
      :brand,
      :body_type,
      :km_driven,
      :model,
      :variant,
      :year,
      :condition,
      :fuel_type,
      :transmission,
      :no_of_owners,
      :extra_notes,
      :features,
      :seller_name,
      :seller_email,
      :seller_phone,
      :images,
      :asking_price,
      :views,
      :display_image_url,
      :ad_status,
      :is_ad_active,
      :location
    ])
    |> put_change(:ad_active_timestamp, DateTime.utc_now() |> DateTime.truncate(:second))
    |> validate_required([
      :post_ad_id,
      :type,
      :brand,
      :body_type,
      :km_driven,
      :model,
      :variant,
      :year,
      :condition,
      :fuel_type,
      :extra_notes,
      :transmission,
      :no_of_owners,
      :features,
      :seller_name,
      :seller_email,
      :seller_phone,
      :images,
      :asking_price,
      :views,
      :display_image_url,
      :ad_status,
      :is_ad_active,
      :location
    ])
  end
end
