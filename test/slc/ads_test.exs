defmodule Slc.AdsTest do
  use Slc.DataCase

  alias Slc.Ads

  describe "ads" do
    alias Slc.Ads.Ad

    @valid_attrs %{ad_active_timestamp: "2010-04-17T14:00:00Z", ad_status: "some ad_status", asking_price: "some asking_price", body_type: "some body_type", brand: "some brand", condition: "some condition", display_image_url: "some display_image_url", features: [], fuel_type: "some fuel_type", images: [], is_ad_active: true, km_driven: "some km_driven", model: "some model", no_of_owners: "some no_of_owners", post_ad_id: "some post_ad_id", seller_details: [], transmission: "some transmission", type: "some type", variant: "some variant", views: 42, year: "some year"}
    @update_attrs %{ad_active_timestamp: "2011-05-18T15:01:01Z", ad_status: "some updated ad_status", asking_price: "some updated asking_price", body_type: "some updated body_type", brand: "some updated brand", condition: "some updated condition", display_image_url: "some updated display_image_url", features: [], fuel_type: "some updated fuel_type", images: [], is_ad_active: false, km_driven: "some updated km_driven", model: "some updated model", no_of_owners: "some updated no_of_owners", post_ad_id: "some updated post_ad_id", seller_details: [], transmission: "some updated transmission", type: "some updated type", variant: "some updated variant", views: 43, year: "some updated year"}
    @invalid_attrs %{ad_active_timestamp: nil, ad_status: nil, asking_price: nil, body_type: nil, brand: nil, condition: nil, display_image_url: nil, features: nil, fuel_type: nil, images: nil, is_ad_active: nil, km_driven: nil, model: nil, no_of_owners: nil, post_ad_id: nil, seller_details: nil, transmission: nil, type: nil, variant: nil, views: nil, year: nil}

    def ad_fixture(attrs \\ %{}) do
      {:ok, ad} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Ads.create_ad()

      ad
    end

    test "list_ads/0 returns all ads" do
      ad = ad_fixture()
      assert Ads.list_ads() == [ad]
    end

    test "get_ad!/1 returns the ad with given id" do
      ad = ad_fixture()
      assert Ads.get_ad!(ad.id) == ad
    end

    test "create_ad/1 with valid data creates a ad" do
      assert {:ok, %Ad{} = ad} = Ads.create_ad(@valid_attrs)
      assert ad.ad_active_timestamp == DateTime.from_naive!(~N[2010-04-17T14:00:00Z], "Etc/UTC")
      assert ad.ad_status == "some ad_status"
      assert ad.asking_price == "some asking_price"
      assert ad.body_type == "some body_type"
      assert ad.brand == "some brand"
      assert ad.condition == "some condition"
      assert ad.display_image_url == "some display_image_url"
      assert ad.features == []
      assert ad.fuel_type == "some fuel_type"
      assert ad.images == []
      assert ad.is_ad_active == true
      assert ad.km_driven == "some km_driven"
      assert ad.model == "some model"
      assert ad.no_of_owners == "some no_of_owners"
      assert ad.post_ad_id == "some post_ad_id"
      assert ad.seller_details == []
      assert ad.transmission == "some transmission"
      assert ad.type == "some type"
      assert ad.variant == "some variant"
      assert ad.views == 42
      assert ad.year == "some year"
    end

    test "create_ad/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Ads.create_ad(@invalid_attrs)
    end

    test "update_ad/2 with valid data updates the ad" do
      ad = ad_fixture()
      assert {:ok, %Ad{} = ad} = Ads.update_ad(ad, @update_attrs)
      assert ad.ad_active_timestamp == DateTime.from_naive!(~N[2011-05-18T15:01:01Z], "Etc/UTC")
      assert ad.ad_status == "some updated ad_status"
      assert ad.asking_price == "some updated asking_price"
      assert ad.body_type == "some updated body_type"
      assert ad.brand == "some updated brand"
      assert ad.condition == "some updated condition"
      assert ad.display_image_url == "some updated display_image_url"
      assert ad.features == []
      assert ad.fuel_type == "some updated fuel_type"
      assert ad.images == []
      assert ad.is_ad_active == false
      assert ad.km_driven == "some updated km_driven"
      assert ad.model == "some updated model"
      assert ad.no_of_owners == "some updated no_of_owners"
      assert ad.post_ad_id == "some updated post_ad_id"
      assert ad.seller_details == []
      assert ad.transmission == "some updated transmission"
      assert ad.type == "some updated type"
      assert ad.variant == "some updated variant"
      assert ad.views == 43
      assert ad.year == "some updated year"
    end

    test "update_ad/2 with invalid data returns error changeset" do
      ad = ad_fixture()
      assert {:error, %Ecto.Changeset{}} = Ads.update_ad(ad, @invalid_attrs)
      assert ad == Ads.get_ad!(ad.id)
    end

    test "delete_ad/1 deletes the ad" do
      ad = ad_fixture()
      assert {:ok, %Ad{}} = Ads.delete_ad(ad)
      assert_raise Ecto.NoResultsError, fn -> Ads.get_ad!(ad.id) end
    end

    test "change_ad/1 returns a ad changeset" do
      ad = ad_fixture()
      assert %Ecto.Changeset{} = Ads.change_ad(ad)
    end
  end
end
