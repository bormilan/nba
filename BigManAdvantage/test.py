import time

st = time.time()


import polars as pl
from nba_api.stats.endpoints import (
    leaguedashlineups,
    commonplayerinfo,
    leaguedashplayerbiostats,
)

from nba_api.stats.static import players

season = "2022-23"

raw = leaguedashlineups.LeagueDashLineups(
    measure_type_detailed_defense="Opponent", season=season
).get_normalized_dict()

df = pl.DataFrame(raw["Lineups"])

df = (
    df.with_columns(
        [
            df["GROUP_ID"].str.split("-").list[1].alias("player_id_1"),
            df["GROUP_ID"].str.split("-").list[2].alias("player_id_2"),
            df["GROUP_ID"].str.split("-").list[3].alias("player_id_3"),
            df["GROUP_ID"].str.split("-").list[4].alias("player_id_4"),
            df["GROUP_ID"].str.split("-").list[5].alias("player_id_5"),
        ]
    )
    .filter(pl.col("MIN") > 1)
    .sort("MIN")
)

players_stats = leaguedashplayerbiostats.LeagueDashPlayerBioStats(
    season=season
).get_normalized_dict()
players_stats_df = pl.DataFrame(players_stats["LeagueDashPlayerBioStats"])

df = df.cast(
    {
        "player_id_1": pl.Int64,
        "player_id_2": pl.Int64,
        "player_id_3": pl.Int64,
        "player_id_4": pl.Int64,
        "player_id_5": pl.Int64,
    }
)

for i in range(1, 6):
    df = df.join(
        players_stats_df,
        left_on=f"player_id_{i}",
        right_on="PLAYER_ID",
        suffix=f"_player{i}",
    )

df.write_csv("test.csv")

et = time.time()

elapsed_time = et - st
print("Execution time:", elapsed_time, "seconds")
