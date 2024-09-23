def solution(name):
    # 알파벳 변경 횟수( 상하 이동 ) 
    # name의 글자 수에 따라 A의 숫자 결정
    spell_move = 0
    
    # 커서 이동 횟수, 이름의 길이 - 1( 좌우 이동 )
    cursor_move = len(name) - 1
    
    for i, spell in enumerate(name) :
        # 알파벳 변경 횟수, 위 아래 최솟 값 구하기
        spell_move += min(ord(spell) - ord('A'), ord('Z')- ord(spell) + 1)
        
         # 해당 알파벳 다음부터 연속된 A 문자열 찾기
        next = i + 1 # 두 번째 알파벳 부터 시작
        while next < len(name) and name[next] == 'A' :
            next += 1
            
        cursor_move = min(cursor_move, 2 * i + len(name) - next,  i + 2 * (len(name) - next) )
    
    return spell_move + cursor_move