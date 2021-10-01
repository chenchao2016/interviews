// 30分钟
const competitionResult = `Allegoric Alaskans;Blithering Badgers;win
Devastating Donkeys;Courageous Californians;draw
Devastating Donkeys;Allegoric Alaskans;win
Courageous Californians;Blithering Badgers;loss
Blithering Badgers;Devastating Donkeys;loss
Allegoric Alaskans;Courageous Californians;win
Courageous Aest;Allegoric Alaskans;draw
`;

function footballCompetition(competitionResult) {
  const resultMap = new Map();
  const defaultResult = { MP: 0, W: 0, D: 0, L: 0, P: 0 };
  const handleResult = (team, { type, point }) => {
    if (!resultMap.get(team)) resultMap.set(team, { ...defaultResult });
    resultMap.set(team, {
      ...resultMap.get(team),
      MP: resultMap.get(team).MP + 1,
      [type]: resultMap.get(team)[type] + 1,
      P: resultMap.get(team).P + point,
    });
  };
  competitionResult.split("\n").forEach((result) => {
    const resultToArray = result.split(";");
    if (resultToArray.length === 3) {
      const [teamA, teamB, result] = resultToArray;
      if (result === "win") {
        handleResult(teamA, { type: "W", point: 3 });
        handleResult(teamB, { type: "L", point: 0 });
      } else if (result === "draw") {
        handleResult(teamA, { type: "D", point: 1 });
        handleResult(teamB, { type: "D", point: 1 });
      } else if (result === "loss") {
        handleResult(teamA, { type: "L", point: 0 });
        handleResult(teamB, { type: "W", point: 3 });
      }
    }
  });
  let printTable = []
  for (const [key, object] of resultMap.entries()) {
    printTable.push(
      { team: key, MP: object.MP, W: object.W ,  D:object.D, L :object.L, P:object.P }
    )
  }
  printTable.sort((teamA,teamB) => {
    if(teamA.P > teamB.P) return -1;
    if(teamA.P < teamB.P) return 1;
    if(teamA.team < teamB.team) return -1;
    if(teamA.team > teamB.team) return 1;
    return 0;
  })
  return printTable;
}

const r = footballCompetition(competitionResult);
console.table(r)
