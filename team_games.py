import pandas as pd
from nba_api.stats.endpoints import teamgamelog
from nba_api.stats.static import teams

def get_team_log(team_name, save):
    team_1_ID = teams.find_teams_by_full_name(team_name)[0]['id']
    team_games = teamgamelog.TeamGameLog(team_id=team_1_ID).get_normalized_dict()["TeamGameLog"]
    df = pd.DataFrame(team_games)

    if save:
        df.to_csv(f"{team_name}_log.csv")

    return df