defmodule Slc.UsersTest do
  use Slc.DataCase

  alias Slc.Users

  describe "slc_users" do
    alias Slc.Users.User

    @valid_attrs %{login_id: "some login_id", name: "some name", password_hash: "some password_hash", role: "some role"}
    @update_attrs %{login_id: "some updated login_id", name: "some updated name", password_hash: "some updated password_hash", role: "some updated role"}
    @invalid_attrs %{login_id: nil, name: nil, password_hash: nil, role: nil}

    def user_fixture(attrs \\ %{}) do
      {:ok, user} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Users.create_user()

      user
    end

    test "list_slc_users/0 returns all slc_users" do
      user = user_fixture()
      assert Users.list_slc_users() == [user]
    end

    test "get_user!/1 returns the user with given id" do
      user = user_fixture()
      assert Users.get_user!(user.id) == user
    end

    test "create_user/1 with valid data creates a user" do
      assert {:ok, %User{} = user} = Users.create_user(@valid_attrs)
      assert user.login_id == "some login_id"
      assert user.name == "some name"
      assert user.password_hash == "some password_hash"
      assert user.role == "some role"
    end

    test "create_user/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Users.create_user(@invalid_attrs)
    end

    test "update_user/2 with valid data updates the user" do
      user = user_fixture()
      assert {:ok, %User{} = user} = Users.update_user(user, @update_attrs)
      assert user.login_id == "some updated login_id"
      assert user.name == "some updated name"
      assert user.password_hash == "some updated password_hash"
      assert user.role == "some updated role"
    end

    test "update_user/2 with invalid data returns error changeset" do
      user = user_fixture()
      assert {:error, %Ecto.Changeset{}} = Users.update_user(user, @invalid_attrs)
      assert user == Users.get_user!(user.id)
    end

    test "delete_user/1 deletes the user" do
      user = user_fixture()
      assert {:ok, %User{}} = Users.delete_user(user)
      assert_raise Ecto.NoResultsError, fn -> Users.get_user!(user.id) end
    end

    test "change_user/1 returns a user changeset" do
      user = user_fixture()
      assert %Ecto.Changeset{} = Users.change_user(user)
    end
  end
end
