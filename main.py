import time
import random
import pandas as pd

from nba_api.stats.endpoints import leaguegamelog
from nba_api.stats.static import teams

from league_games import generate_league_game_log
from team_games import get_team_log
    

def main():

    df = generate_league_game_log()
    df_filtered = df[['SEASON_ID', 'GAME_ID', 'GAME_DATE', 'TEAM_ID', 'TEAM_NAME', 'TEAM_ID_2', 'TEAM_NAME_2']]

    team_names = pd.DataFrame.from_records(teams.get_teams())['full_name']
    all_team = get_team_log(team_names[0])
    for team in team_names[1:]:
        time.sleep(random.uniform(0.5,1))
        new = get_team_log(team)
        all_team = pd.concat([all_team, new])

    all_team.columns = ['MATCHUP', 'GAME_ID', 'TEAM_ID', 'W', 'L', 'W_PCT', 'day_in_month', 'day_in_week']
    df_filtered["GAME_ID"] = df_filtered["GAME_ID"].astype(int)
    df_filtered["TEAM_ID"] = df_filtered["TEAM_ID"].astype(int)

    all_team["GAME_ID"] = all_team["GAME_ID"].astype(int)
    all_team["TEAM_ID"] = all_team["TEAM_ID"].astype(int)

    joined = pd.merge(
        df_filtered, all_team, on=["GAME_ID", "TEAM_ID"]
    )

    all_team.columns = ['MATCHUP', 'GAME_ID', 'TEAM_ID_2', 'W', 'L', 'W_PCT', 'day_in_month', 'day_in_week']

    joined2 = pd.merge(
        joined, all_team, on=["GAME_ID", "TEAM_ID_2"]
    )

    joined2.to_csv("test_train.csv")

main()