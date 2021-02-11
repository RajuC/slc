defmodule Mix.Tasks.Slc.SyncAttributes do
  use Mix.Task

  @start_apps [
    :postgrex,
    :ecto,
    :httpoison,
    :logger
  ]

  @repos [
    Slc.Repo
  ]

  require Logger

  @shortdoc "Sync cars and bikes attributes to slc db"

  def run() do
    Application.load(:slc)
    Enum.each(@start_apps, &Application.ensure_all_started/1)
    Enum.each(@repos, & &1.start_link(pool_size: 2))

    path = Application.app_dir(:slc, "priv/repo/migrations")
    Ecto.Migrator.run(Slc.Repo, path, :up, all: true)
    IO.puts("Syncing attributes......")

    attrs_file_path = Application.app_dir(:slc, "priv/static/attributes/bmv.json")

    case File.read(attrs_file_path) do
      {:ok, body} ->
        body |> Poison.decode!() |> sync_bmv()

      {:error, reason} ->
        Logger.error("Reading car_attrs_json_file failed reason: #{reason}")
    end
  end

  defp sync_bmv(%{"cars" => cars_bmv}) do
    cars_bmv
    |> Enum.map(fn {brand, modelVariants} ->
      modelVariants
      |> Enum.map(fn {model, variants} ->
        variants
        |> Enum.map(&Task.async(fn -> store_car_attr("car", brand, model, &1) end))
        |> Enum.map(&Task.await/1)
      end)
    end)
  end

  defp sync_bmv(%{"bikes" => bikes_bm}) do
    bikes_bm
    |> Enum.map(fn {brand, models} ->
      models
      |> Enum.map(&Task.async(fn -> store_bike_attr("bike", brand, &1) end))
      |> Enum.map(&Task.await/1)
    end)
  end

  defp store_car_attr(type, brand, model, variant) do
    CarAttributes.create_car_attribute(%{
      "type" => type,
      "brand" => brand,
      "model" => model,
      "variant" => variant
    })
  end

  defp store_bike_attr(type, brand, model) do
    BikeAttributes.create_car_attribute(%{
      "type" => type,
      "brand" => brand,
      "model" => model
    })
  end

  # t = [1,1,2,2,3]

  # f = fn(n) ->
  #   IO.puts("starting #{n}")
  #   :timer.sleep(n * 1000)
  #   IO.puts("finishing #{n}")
  #   n
  # end

  # tasks = Enum.map(t, fn(n) ->
  #   Task.async(fn ->  f.(n) end)
  # end)

  # :timer.sleep(6000)

  # Enum.each(tasks, fn(task) ->
  #   Task.await(task) |> IO.inspect
  # end
  # )

  # IO.puts "done"

end
