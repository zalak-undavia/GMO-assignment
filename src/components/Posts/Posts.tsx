import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const columns: GridColDef<Post>[] = [
  { field: "userId", headerName: "User ID", width: 100 },
  {
    field: "id",
    headerName: "Post ID",
    width: 100,
  },
  {
    field: "title",
    headerName: "Post Title",
    flex: 1,
  },
  {
    field: "body",
    headerName: "Post Body",
    type: "number",
    flex: 1,
  },
];

function Posts(): React.ReactElement {
  const [loading, setLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const url = "https://jsonplaceholder.typicode.com/posts";
        const raw = await fetch(url);
        const posts = await raw.json();
        setPosts(posts);
      } catch (e) {
        console.warn(e);
      } finally {
        setLoading(false);
      }
    };
    setLoading(true);
    fetchPosts();
  }, []);

  return (
    <div>
      {loading && <div>Loading....</div>}
      {!loading && (
        <div>
          <Box sx={{ height: "50vh", width: "100%" }}>
            <DataGrid rows={posts} columns={columns} disableRowSelectionOnClick />
          </Box>
        </div>
      )}
    </div>
  );
}
export default Posts;
