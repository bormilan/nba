import polars as pl
import time
import numpy as np

st = time.time()

df = pl.read_csv("test.csv")

height_cols = [
    "PLAYER_HEIGHT_INCHES",
    "PLAYER_HEIGHT_INCHES_player2",
    "PLAYER_HEIGHT_INCHES_player3",
    "PLAYER_HEIGHT_INCHES_player4",
    "PLAYER_HEIGHT_INCHES_player5",
]
# for col in df.columns:
# print(col)
df = df.with_columns(
    HEIGHT_SUM=pl.concat_list(height_cols).list.sum(),
    HEIGHT_MEAN=pl.concat_list(height_cols).list.mean(),
    HEIGHT_MAX=pl.concat_list(height_cols).list.max(),
    OPP_FGA_PER_MINUTE=pl.col("OPP_FGA") / pl.col("MIN"),
).select(
    [
        "GROUP_NAME",
        "GP",
        "W_PCT",
        "MIN",
        "OPP_FGA",
        "OPP_FG_PCT",
        "OPP_FG3A",
        "OPP_FG3_PCT",
        "OPP_FTA",
        "OPP_FT_PCT",
        "OPP_OREB",
        "OPP_DREB",
        "OPP_REB",
        "OPP_AST",
        "OPP_TOV",
        "OPP_STL",
        "OPP_BLK",
        "OPP_BLKA",
        "OPP_PF",
        "OPP_PFD",
        "OPP_PTS",
        "W_RANK",
        "W_PCT_RANK",
        "OPP_FGA_RANK",
        "OPP_FG_PCT_RANK",
        "OPP_FG3A_RANK",
        "OPP_FG3_PCT_RANK",
        "OPP_FTA_RANK",
        "OPP_FT_PCT_RANK",
        "OPP_OREB_RANK",
        "OPP_DREB_RANK",
        "OPP_REB_RANK",
        "OPP_AST_RANK",
        "OPP_TOV_RANK",
        "OPP_STL_RANK",
        "OPP_BLK_RANK",
        "OPP_BLKA_RANK",
        "OPP_PF_RANK",
        "OPP_PFD1",
        "OPP_PTS_RANK",
        "PLAYER_NAME",
        "PLAYER_HEIGHT",
        "PLAYER_HEIGHT_INCHES",
        "PLAYER_NAME_player2",
        "PLAYER_HEIGHT_player2",
        "PLAYER_HEIGHT_INCHES_player2",
        "PLAYER_NAME_player3",
        "PLAYER_HEIGHT_player3",
        "PLAYER_HEIGHT_INCHES_player3",
        "PLAYER_NAME_player4",
        "PLAYER_HEIGHT_player4",
        "PLAYER_HEIGHT_INCHES_player4",
        "PLAYER_NAME_player5",
        "PLAYER_HEIGHT_player5",
        "PLAYER_HEIGHT_INCHES_player5",
        "HEIGHT_SUM",
        "HEIGHT_MEAN",
        "HEIGHT_MAX",
        "OPP_FGA_PER_MINUTE",
    ]
)

# static variables
(
    _,
    _,
    _,
    _,
    _,
    height_first_quartile,
    height_median,
    height_third_quartile,
    _,
) = df.describe()["HEIGHT_MEAN"]
_, _, _, _, _, fga_first_quartile, fga_median, fga_third_quartile, _ = df.describe()[
    "OPP_FGA"
]


def height_level_from_height(height):
    return (
        "S"
        if height < height_first_quartile
        else "M"
        if height < height_median
        else "L"
        if height < height_third_quartile
        else "XL"
    )


def fga_level_from_fga(fga):
    return (
        "S"
        if fga < fga_first_quartile
        else "M"
        if fga < fga_median
        else "L"
        if fga < fga_third_quartile
        else "XL"
    )


df = df.with_columns(
    pl.struct(["HEIGHT_MEAN"])
    .apply(lambda x: height_level_from_height(x["HEIGHT_MEAN"]))
    .alias("HEIGHT_LEVEL"),
    pl.struct(["OPP_FGA"])
    .apply(lambda x: fga_level_from_fga(x["OPP_FGA"]))
    .alias("FGA_LEVEL"),
)

df.write_csv("processed.csv")

et = time.time()

elapsed_time = et - st
print("Execution time:", elapsed_time, "seconds")
