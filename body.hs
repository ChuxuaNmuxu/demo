doubleMe x = x + x

doubleSmallNumber x = if x > 100
                    then x
                    else x * 2

factorial :: Integer -> Integer
factorial n = product [1..n]

circumference :: Double -> Double
circumference r = 2 * pi * r

lucky :: (Integral a) => a -> String
lucky 7 = "LUCKY NUMBER SEVEN"
lucky x = "SORRY"

factorial1 :: (Integral a) => a -> a
factorial1 0 = 1
factorial1 n = n * factorial1(n - 1)

max' :: (Ord a) => a -> a -> a
max' a b
    | a > b     = a
    | otherwise = b

zip' :: [a] -> [b] -> [(a, b)]
zip' _ [] = []
zip' [] _ = []
zip' (x:xs) (y:ys) = (x,y) : zip' xs ys

chain :: Integer -> [Integer]
chain 1 = [1]
chain   n
        | even n = n : chain(n `div` 2) 
        | odd n = n : chain(n * 3 + 1)


numLongChains :: Int
numLongChains = length (filter isLong (map chain [1..10]))
                where isLong xs = length xs > 15

numLongChains' :: Int
numLongChains' = length (filter (\xs -> length xs > 15) (map chain [1..100]))

