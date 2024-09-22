def solve() :

    naturul_sum = set(range(1, 10001))
    generated_sum = set()

    for i in range(1, 10001) :
        for j in str(i) :
            i += int(j)
        generated_sum.add(i)   

    newSum = sorted(naturul_sum - generated_sum)
    for i in newSum:
        print(i)


if __name__ == "__main__":
    
    solve()  