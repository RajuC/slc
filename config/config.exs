# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :slc,
  ecto_repos: [Slc.Repo]

# Configures the endpoint
config :slc, SlcWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "SDoi1eLpwF8G2P+fGelkggYS5RkBvhviZaUliNCdzb6glcgeaggaFfjSkcdkiYZH",
  render_errors: [view: SlcWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Slc.PubSub, adapter: Phoenix.PubSub.PG2],
  live_view: [signing_salt: "PfWOsO0s"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
