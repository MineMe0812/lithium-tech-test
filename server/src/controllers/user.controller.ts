export function allAccess(req:any, res:any) {
    res.status(200).send("Public Content.");
}

export function userBoard(req:any, res:any) {
    res.status(200).send("User Content.");
}

export function adminBoard(req:any, res:any) {
    res.status(200).send("Admin Content.");
}

export function moderatorBoard(req:any, res:any) {
    res.status(200).send("Moderator Content.");
}


export const user = {
    allAccess,
    userBoard,
    adminBoard,
    moderatorBoard
};