defmodule Slc.Repo do
  use Ecto.Repo,
    otp_app: :slc,
    adapter: Ecto.Adapters.Postgres
end
