import time
import random
import pandas as pd

from nba_api.stats.static import teams

from league_games import generate_league_game_log
from team_games import get_team_log, get_team_lineup

def get_col_names(cols_final, cols_before_lineup):
    final = list(cols_before_lineup)

    index = 0
    for i, _ in enumerate(cols_final[len(cols_before_lineup):]):
        if i % 2 != 0: 
            final.append(f"start_position_{index}")
            index = index + 1
        else:
            final.append(f"player_id_{index}")

    return final

def main():

    df = generate_league_game_log()
    df_filtered = df[['WL', 'SEASON_ID', 'GAME_ID', 'GAME_DATE', 'TEAM_ID', 'TEAM_NAME', 'TEAM_ID_2', 'TEAM_NAME_2']]

    team_names = pd.DataFrame.from_records(teams.get_teams())['full_name']
    all_team = get_team_log(team_names[0])
    for team in team_names[1:]:
        print(f"team_log_table: {team}")
        time.sleep(random.uniform(0.5,1))
        new = get_team_log(team)
        all_team = pd.concat([all_team, new])

    all_team.columns = ['MATCHUP', 'GAME_ID', 'TEAM_ID', 'W', 'L', 'W_PCT', 'day_in_month', 'day_in_week']
    df_filtered["GAME_ID"] = df_filtered["GAME_ID"].astype(int)
    df_filtered["TEAM_ID"] = df_filtered["TEAM_ID"].astype(int)

    all_team["GAME_ID"] = all_team["GAME_ID"].astype(int)
    all_team["TEAM_ID"] = all_team["TEAM_ID"].astype(int)

    print("first join")
    joined = pd.merge(
        df_filtered, all_team, on=["GAME_ID", "TEAM_ID"]
    )

    all_team.columns = ['MATCHUP', 'GAME_ID', 'TEAM_ID_2', 'W', 'L', 'W_PCT', 'day_in_month', 'day_in_week']

    print("second join")
    joined2 = pd.merge(
        joined, all_team, on=["GAME_ID", "TEAM_ID_2"]
    )

    joined2.to_csv("test_train.csv")

    final = joined2.apply(get_team_lineup, axis=1)
    final.columns = get_col_names(final.columns, joined2.columns)

    final.to_csv("test_final.csv")

def not_main():
    df = pd.read_csv("test_final.csv")
    df.columns = get_col_names(df.columns, ['WL', 'SEASON_ID', 'GAME_ID', 'GAME_DATE', 'TEAM_ID', 'TEAM_NAME',
       'TEAM_ID_2', 'TEAM_NAME_2', 'MATCHUP_x', 'W_x', 'L_x', 'W_PCT_x',
       'day_in_month_x', 'day_in_week_x', 'MATCHUP_y', 'W_y', 'L_y', 'W_PCT_y',
       'day_in_month_y', 'day_in_week_y'])

    df.to_csv("testtttt.csv")

start_time = time.time()
main()
# not_main()
print("--- %s seconds ---" % (time.time() - start_time))