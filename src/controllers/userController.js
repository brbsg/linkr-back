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
  const { search } = req.body;

  try {
    const { rows: dbUser } = await connection.query(
      `
      SELECT * 
      FROM users
      WHERE LOWER(name) LIKE LOWER($1)
    `,
      [`${search}%`]
    );

    console.log(dbUser);

    res.send(dbUser);
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
      try {
        const promise = await urlMetadata(dbPosts[i].link);

        dbPosts[i].deleteOption = false;
        if (userId === dbPosts[i].userId) {
          dbPosts[i].deleteOption = true;
        }

        dbPosts[i].linkImage = promise.image;
        dbPosts[i].linkTitle = promise.title;
        dbPosts[i].linkDescription = promise.description;
      } catch {
        dbPosts[i].deleteOption = false;
        if (userId === dbPosts[i].userId) {
          dbPosts[i].deleteOption = true;
        }
        dbPosts[i].linkImage =
          "https://pbs.twimg.com/profile_images/1605443902/error-avatar.jpg";
        dbPosts[i].linkTitle = "invalid";
        dbPosts[i].linkDescription = "invalid";
      }
    }

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
