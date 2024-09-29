from collections import deque

def solve(n, map_data):
    
    visited = [[False] * n for _ in range(n)]
    
    # 하, 우측 이동 
    dir = [(1, 0), (0, 1)]
    
    def bfs(x, y):
        queue = deque([(x, y)])
        visited[x][y] = True
        
        while queue:
            curX, curY = queue.popleft() #Js의 shift()와 연결

            if(curX == n - 1 and curY == n-1) :
                return True
            
            jump = map_data[curX][curY]
            
            for dx, dy in dir:
                nextX, nextY = curX + dx * jump, curY + dy * jump
                
                if 0 <= nextX < n and 0 <= nextY < n:
                    if not visited[nextX][nextY]:
                        visited[nextX][nextY] = True
                        queue.append((nextX, nextY))
                        
        
        return False

    if(bfs(0,0)) :
        print('HaruHaru')
    else :
        print('Hing')
    
    

if __name__ == "__main__":
    n = int(input())
    map_data = [list(map(int, input().split())) for _ in range(n)]
    solve(n, map_data)