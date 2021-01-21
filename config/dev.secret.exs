use Mix.Config

config :slc, Slc.Repo,
username: "postgres",
password: "a2z365kars",
database: "kars_slc_365_a2z_dev",
hostname: "a2z-365-kars-db.cukyv6lnfbmo.us-east-2.rds.amazonaws.com",
show_sensitive_data_on_connection_error: true,
pool_size: 10
