import pandas as pd
from nba_api.stats.endpoints import teamgamelog
from nba_api.stats.static import teams
from sklearn import preprocessing
import time
import random
from nba_api.stats.endpoints import boxscoreadvancedv2

def get_team_log(team_name, save=False):
    team_name = "Los Angeles Clippers" if team_name == "LA Clippers" else team_name
    team_1_ID = teams.find_teams_by_full_name(team_name)[0]['id']
    team_games = pd.DataFrame(teamgamelog.TeamGameLog(team_id=team_1_ID).get_normalized_dict()["TeamGameLog"])

    #ebbe a táblába csak a statokat rakjuk
    train_stats = team_games[['W', 'L', 'W_PCT']]

    #hozzá kell adni egy plusz sort az elejére
    #TODO: concat warning
    # train_stats = train_stats.append({'W':0,'L':0,'W_PCT':0}, ignore_index=True)
    train_stats.loc[len(train_stats), ['W', 'L', 'W_PCT']] = 0, 0, 0
    #meg kell fordítani a sorrendet
    train_stats = train_stats[::-1]
    #el kell dobni az utolsó sort
    train_stats = train_stats.drop(0)
    #indexeket a megfordítás miatt újra kell állítani
    train_stats = train_stats.reset_index(drop=True)

    #ide azokat amiket el kell csúsztatni
    train = team_games[['GAME_DATE', 'MATCHUP', 'Game_ID', 'Team_ID']][::-1]
    #indexeket a megfordítás miatt újra kell állítani
    train = train.reset_index(drop=True)

    #össze kell rakni a két elkészült táblát
    train = pd.concat([train,train_stats], axis=1)

    #át kell alakítani a matchupot úgy hogy értelmesebb, használhatóbb legyen
    train['MATCHUP'] = train['MATCHUP'].map(lambda x: x.split(' ')[2])

    #date átalakítások
    train['GAME_DATE'] = pd.to_datetime(train['GAME_DATE'], format="%b %d, %Y")
    train['day_in_month'] = train['GAME_DATE'].map(lambda x: int(x.strftime("%d")))
    train['day_in_week'] = train['GAME_DATE'].map(lambda x: int(x.strftime("%w")))
    df = train.drop('GAME_DATE', axis=1)

    #encode matchup data to numeric
    encoder = preprocessing.LabelEncoder()
    time.sleep(random.uniform(0.5,1))
    encoder.fit(pd.DataFrame.from_records(teams.get_teams())['abbreviation'])
    encoder.classes_

    df['MATCHUP'] = encoder.transform(train.MATCHUP)

    if save:
        df.to_csv(f"{team_name}_log.csv")

    return df

# def get_team_WL(row):
#     time.sleep(random.uniform(0.5,1))
#     df1 = get_team_log(row["TEAM_NAME"])
#     df2 = get_team_log(row["TEAM_NAME_2"])
#     wl1 = df1.loc[df1['Game_ID'] == ("00" + str(row["GAME_ID"])), ['W', 'L', "W_PCT", "MATCHUP"]].values[0]
#     wl2 = df2.loc[df2['Game_ID'] == ("00" + str(row["GAME_ID"])), ['W', 'L', "W_PCT"]].values[0]
#     row["W_H"], row["L_H"], row["W_A"], row["L_A"],row["WPCT_H"], row["WPCT_A"], row["MATCHUP"] = wl1[0], wl2[1], wl2[0], wl2[1], wl1[2], wl2[2], wl1[3]
#     return row

def get_team_lineup(row):
    time.sleep(random.uniform(0.5,1))
    game_id = "00" + str(row["GAME_ID"])
    print(f"get_team_linup: {game_id}")
    df = pd.DataFrame(boxscoreadvancedv2.BoxScoreAdvancedV2(game_id=game_id).get_normalized_dict()["PlayerStats"])
    #egy sorba kell rendezni egy csapat adatait
    team1 = pd.DataFrame(df.loc[df["TEAM_ID"] == row["TEAM_ID"], [ 'PLAYER_ID', 'START_POSITION', ]].to_numpy().flatten()).T
    team2 = pd.DataFrame(df.loc[df["TEAM_ID"] == row["TEAM_ID_2"], [ 'PLAYER_ID', 'START_POSITION', ]].to_numpy().flatten()).T
    lineup = pd.concat([team1, team2], axis=1).squeeze()

    # print(row)
    # lineup = pd.Series(lineup.values.reshape(1, len(lineup)))
    # print(lineup.shape)
    row = row.append(lineup, ignore_index=True)

    return row