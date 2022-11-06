import pandas as pd
from nba_api.stats.endpoints import leaguegamelog

log = leaguegamelog.LeagueGameLog().get_normalized_dict()['LeagueGameLog']

df1 = pd.DataFrame(log[::2])
df2 =  pd.DataFrame(log[1::2])
df2.columns = [f"{column}_2" for column in df2.columns]

all_games = df1.join(df2)
all_games['WL'] = all_games['WL'].map(lambda x: 'H' if x == 'W' else 'A')
all_games.to_csv("league_games.csv")