from collections import deque

def solve():
    
    visited = [[False] * m for _ in range(n)]
    
    # 상, 하, 좌, 우 방향 설정
    dir = [(-1, 0), (1, 0), (0, -1), (0, 1)]
    
    def bfs(x, y):
        queue = deque([(x, y)])
        visited[x][y] = True
        size = 1
        
        while queue:
            curX, curY = queue.popleft() #Js의 shift()와 연결
            
            for dx, dy in dir:
                nextX, nextY = curX + dx, curY + dy
                
                if 0 <= nextX < n and 0 <= nextY < m:
                    if not visited[nextX][nextY] and map_data[nextX][nextY] == 1:
                        visited[nextX][nextY] = True
                        queue.append((nextX, nextY))
                        size += 1
        
        return size
    
    picture_count = 0
    max_picture_size = 0
    
    for i in range(n):
        for j in range(m):
            if map_data[i][j] == 1 and not visited[i][j]:
                picture_count += 1
                picture_size = bfs(i, j)
                max_picture_size = max(max_picture_size, picture_size)
    
    print(picture_count)
    print(max_picture_size)

if __name__ == "__main__":
    n, m = map(int, input().split())
    map_data = [list(map(int, input().split())) for _ in range(n)]
    solve()