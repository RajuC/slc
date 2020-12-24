defmodule Slc.Auth.Pipeline do
  use Guardian.Plug.Pipeline, otp_app: :slc,
  module: Slc.Auth.Guardian,
  error_handler: Slc.Auth.ErrorHandler

  plug Guardian.Plug.VerifyHeader, realm: "Bearer"
  plug Guardian.Plug.EnsureAuthenticated
  plug Guardian.Plug.LoadResource
end
