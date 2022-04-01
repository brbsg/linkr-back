import connection from "../database.js";

export async function getUserName(req, res) {
  const { id } = req.params;

  try {
    const user = await connection.query(
      `
            SELECT * FROM users
            WHERE id = $1
        `,
      [id]
    );

    console.log(user.rows[0]);
    res.send(user.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function searchUsers(req, res) {
  const { userId } = res.locals;
  const { search } = req.body;
  let allUsers = [];

  try {
    let { rows: dbFollowing } = await connection.query(
      `
      select users.*, "followedId" from followers
      join users on users.id=followers."followedId"
      WHERE LOWER(name) LIKE LOWER($1) and followers."followerId"=$2
    `,
      [`${search}%`, userId]
    );

    allUsers.push(...dbFollowing);

    let { rows: dbUsers } = await connection.query(
      `
      SELECT * 
      FROM users
      WHERE LOWER(name) LIKE LOWER($1)
    `,
      [`${search}%`]
    );

    function checkIncludes(e) {
      for (let i in dbFollowing) {
        if (e.id === dbFollowing[i].id) {
          return false;
        }
      }

      return true;
    }

    dbUsers = dbUsers.filter((e) => checkIncludes(e));

    allUsers.push(...dbUsers);

    res.send(allUsers);
  } catch (error) {
    console.log(error);
  }
}

export async function getUserPosts(req, res) {
  const userId = res.locals.userId;

  try {
    const { rows: dbPosts } = await connection.query(
      `
        SELECT posts.*, users.name,users.image 
            FROM posts 
        JOIN users 
            ON posts."userId" = users.id
        WHERE posts."userId"=$1
        ORDER BY posts.id DESC LIMIT 20 
    `,
      [req.params.id]
    );

    for (let i in dbPosts) {
      dbPosts[i].delEditOption = false;
      if (userId === dbPosts[i].userId) {
        dbPosts[i].delEditOption = true;
      }
    }

    console.log(dbPosts);

    res.send(dbPosts);
  } catch (error) {
    console.log(error);
  }
}

export async function getUser(req, res) {
  const userId = res.locals.userId;

  try {
    const user = await connection.query(
      `
            SELECT image FROM users
            WHERE id = $1
        `,
      [userId]
    );
    res.send(user.rows[0].image);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function verifyFollow(req, res) {
  const { id } = req.params;
  const userId = res.locals.userId;

  try {
    const result = await connection.query(
      `
        SELECT * FROM followers WHERE "followerId" = $1 AND "followedId" = $2;
      `,
      [userId, id]
    );
    if (result.rowCount === 0) {
      return res.send(false);
    }
    res.send(true);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function toggleFollow(req, res) {
  const { id } = req.params;
  const userId = res.locals.userId;

  if (userId === id) {
    return res.sendStatus(401);
  }

  try {
    const result = await connection.query(
      `
        SELECT * FROM followers WHERE "followerId" = $1 AND "followedId" = $2;
      `,
      [userId, id]
    );
    if (result.rowCount !== 0) {
      try {
        await connection.query(
          `
            DELETE FROM followers WHERE followers.id = $1;
          `,
          [result.rows[0].id]
        );

        return res.send(false);
      } catch (error) {
        console.log(error);
        return res.sendStatus(500);
      }
    }
    await connection.query(
      `
        INSERT INTO followers 
          ("followerId", "followedId")
        VALUES
         ($1, $2);
      `,
      [userId, id]
    );

    res.send(true);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
