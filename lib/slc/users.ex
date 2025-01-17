defmodule Slc.Users do
  @moduledoc """
  The Users context.
  """

  import Ecto.Query, warn: false
  alias Slc.Repo

  alias Slc.Users.User
  alias  Slc.Auth.Guardian
  import Comeonin.Bcrypt, only: [checkpw: 2, dummy_checkpw: 0]
  @doc """
  Returns the list of slc_users.

  ## Examples

      iex> list_slc_users()
      [%User{}, ...]

  """
  def list_slc_users do
    Repo.all(User)
  end

  @doc """
  Gets a single user.

  Raises `Ecto.NoResultsError` if the User does not exist.

  ## Examples

      iex> get_user!(123)
      %User{}

      iex> get_user!(456)
      ** (Ecto.NoResultsError)

  """
  def get_user!(id), do: Repo.get!(User, id)

  def get_user(id) do
    case Repo.get(User, id) do
      nil -> {:error, :not_found}
      user -> {:ok, user}
    end
  end



  @doc """
  Creates a user.

  ## Examples

      iex> create_user(%{field: value})
      {:ok, %User{}}

      iex> create_user(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_user(attrs \\ %{}) do
    %User{}
    |> User.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a user.

  ## Examples

      iex> update_user(user, %{field: new_value})
      {:ok, %User{}}

      iex> update_user(user, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """

  def update_user(%User{} = user, attrs, :without_password) do
    user
    |> User.changeset_without_password(attrs)
    |> Repo.update()
  end


  def update_user(%User{} = user, attrs, :with_password) do
    user
    |> User.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a user.

  ## Examples

      iex> delete_user(user)
      {:ok, %User{}}

      iex> delete_user(user)
      {:error, %Ecto.Changeset{}}

  """
  def delete_user(%User{} = user) do
    Repo.delete(user)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking user changes.

  ## Examples

      iex> change_user(user)
      %Ecto.Changeset{source: %User{}}

  """
  def change_user(%User{} = user) do
    User.changeset(user, %{})
  end



  def token_sign_in_with_login_id(login_id, password) do
    case login_id_password_auth(login_id, password) do
      {:ok, user} ->
        with {:ok, token, _claims} <- Guardian.encode_and_sign(user) do
          {:ok, user, token}
        end
      _ ->
        {:error, :unauthorized}
    end
  end

  defp login_id_password_auth(login_id, password) when is_binary(login_id) and is_binary(password) do
    with {:ok, user} <- get_by_login_id(login_id),
    do: verify_password(password, user)
  end

  defp get_by_login_id(login_id) when is_binary(login_id) do
    case Repo.get_by(User, login_id: login_id) do
      nil ->
        dummy_checkpw()
        {:error, :invalid_login_id}
      user ->
        {:ok, user}
    end
end

defp verify_password(password, %User{} = user) when is_binary(password) do
  if checkpw(password, user.password_hash) do
    {:ok, user}
  else
    {:error, :invalid_password}
  end
end

end
