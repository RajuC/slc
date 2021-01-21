defmodule Slc.Ads.Ad do
  use Ecto.Schema
  import Ecto.Changeset

  schema "slc_ads" do
    field :ad_active_timestamp, :utc_datetime
    field :ad_status, :string, default: "under_review"
    field :asking_price, :string
    field :body_type, :string
    field :brand, :string
    field :condition, :string
    field :display_image_url, :string, default: "NA"
    field :features, {:array, :map}
    field :fuel_type, :string
    field :images, {:array, :map}
    field :is_ad_active, :boolean, default: false
    field :km_driven, :string
    field :model, :string
    field :no_of_owners, :string
    field :post_ad_id, :string
    field :seller_details, :map
    field :transmission, :string
    field :type, :string
    field :variant, :string
    field :views, :integer, default: 0
    field :year, :string
    field :location, :map

    belongs_to :user, Slc.Users.User

    timestamps()
  end

  @doc false
  def changeset(ad, attrs) do
    ad
    |> cast(attrs, [:post_ad_id, :type, :brand, :body_type, :km_driven, :model, :variant, :year, :condition, :fuel_type, :transmission, :no_of_owners, :features, :seller_details, :images, :asking_price, :views, :display_image_url, :ad_status, :is_ad_active, :location])
    |> put_change(:ad_active_timestamp, DateTime.utc_now() |> DateTime.truncate(:second))
    |> validate_required([:post_ad_id, :type, :brand, :body_type, :km_driven, :model, :variant, :year, :condition, :fuel_type, :transmission, :no_of_owners, :features, :seller_details, :images, :asking_price, :views, :display_image_url, :ad_status, :is_ad_active, :location])

  end
end
