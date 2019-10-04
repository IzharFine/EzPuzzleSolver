### Script I built to solve "Check-Point" july 2018 puzzle challenge. <br/>
Demo: https://izharfine.github.io/PuzzleSolver/

### The challenge:
```
At last, we've found you! We must solve this puzzle, and according to the prophecy - you are the one to solve it.
This puzzle is weird. It consists of a board with 10 columns and 10 rows, so there are 100 pieces.Yet, each piece is weird! It has four
'slices' - a top slice, a right slice, a bottom slice and a left slice. Each slice consists of a number. For example, consider this piece:
------------
| \ 12 / |
| 5 \ / 3 |
| / \ |
|/ 4 \ |
------------
Its top is 12, its right is 3, its bottom is 4 and its left is 5. For the puzzle to be solved, all pieces must be sorted into the board, where
each slice is equal to its adjacent slice. In addition, a slice that has no adjacent slice (that is, the slice is a part of the board's border),
must be 0. Other slices are never 0. For example, the following board (with 4 pieces) is valid:
------------------------
| \ 0 / || \ 0 / |
| 0 \ / 9 || 9 \ / 0 |
| / \ || / \ |
| / 17 \ || / 11 \ |
------------------------
------------------------
| \ 17 / || \ 11 / |
| 0 \ / 6 || 6 \ / 0 |
| / \ || / \ |
| / 0 \ || / 0 \ |
------------------------
In the board above, all the border slices are equal to 0. Consider the top-left piece. Its right slice is equal to 9, and its adjacent slice
(the left slice of the top-right piece) also equals 9.
Unfortunately, we have the pieces in a shuffled order. They are given in the following format:
cube_id, [slices]; cube_id, slices; ... cube_id, slices
Where cube_id is a number from 0 to 99, and slices include the numbers in the order: top, right, bottom, left. For instance, consider
the following shuffled board:
------------------------------------
| \ 0 / || \ 0 / || \ 5 / |
| 18\ / 12|| 19\ / 7 || 19\ / 0 |
| / \ || / \ || / \ |
| / 2 \ || / 6 \ || / 0 \ |
------------------------------------
------------------------------------
| \ 6 / || \ 14 / || \ 7 / |
| 10\ / 2 || 10\ / 0|| 0 \ / 12|
| / \ || / \ || / \ |
| / 9 \ || / 5 \ || / 0 \ |
------------------------------------

------------------------------------
| \ 0 / || \ 0 / || \ 0 / |
| 7 \ / 0 || 7 \ / 17|| 17\ / 0 |
| / \ || / \ || / \ |
| / 18 \ || / 9 \ || / 14 \ |
------------------------------------
A string describing the above board is the following one:
'0,[0, 12, 2, 18]; 1,[0, 7, 6, 19]; 2,[5, 0, 0, 19]; 3,[6, 2, 9, 10]; 4,[14, 0, 5, 10]; 5,[7, 12, 0, 0]; 6,[0, 0, 18, 7]; 7,[0, 17, 9, 7]; 8,[0, 0, 14, 17]'
We need you to solve the puzzle!
Provide us a string that looks exactly as follows:
cube_id, times_to_rotate_clockwise; cube_id, times_to_rotate_clockwise;... cube_id, times_to_rotate_clockwise
For example, a solution string will look like this:
2,2; 1,0; 6,0; 4,2; 3,0; 0,1; 8,2; 7,2; 5,3
The above string corresponds to the following (valid) puzzle:
------------------------------------
| \ 0 / || \ 0 / || \ 0 / |
| 0 \ / 19|| 19\ / 7 || 7 \ / 0 |
| / \ || / \ || / \ |
| / 5 \ || / 6 \ || / 18 \ |
------------------------------------
------------------------------------
| \ 5 / || \ 6 / || \ 18 / |
| 0 \ / 10|| 10\ / 2 || 2 \ / 0 |
| / \ || / \ || / \ |
| / 14 \ || / 9 \ || / 12 \ |
------------------------------------
------------------------------------
| \ 14 / || \ 9 / || \ 12 / |
| 0 \ / 17|| 17\ / 7 || 7 \ / 0 |
| / \ || / \ || / \ |
| / 0 \ || / 0 \ || / 0 \ |
------------------------------------
Consider the top-left piece. In the string, it corresponds to '2,2', as we take cube number 2 from the input:
2,[5, 0, 0, 19]
But we rotate it clock-wise, twice, so we get [0,19,5,0].
Now consider the top-middle piece. In the string, it corresponds to '1,0'. That is, we take cube number 1 from the input:
1,[0, 7, 6, 19]
And we don't rotate it at all (that is, rotate it 0 times) - as it's already in the right direction.
Got it?
Help us solve the puzzle!

The puzzle we have is:
0,[3, 19, 5, 15]; 1,[0, 17, 6, 11]; 2,[12, 15, 9, 5]; 3,[10, 2, 0, 7]; 4,[6, 8, 4, 0]; 5,[3, 1, 12, 17]; 6,[20, 16, 0, 0]; 7,[0, 1, 9, 0]; 8,[17, 16, 0, 8]; 9,[18, 15, 15, 17]; 10,[4, 9, 8, 16]; 11,[0, 11, 17, 20]; 12,[5, 6, 5, 19]; 13,[10, 11, 1, 4]; 14,[16, 2, 3, 5]; 15,[9, 20, 10, 11]; 16,[11, 3, 13, 3]; 17,[0, 2, 16, 2]; 18,[11, 18, 16, 5]; 19,[11, 20, 13, 15]; 20,[16, 18, 11, 1]; 21,[10, 8, 12, 3]; 22,[17, 18, 17, 18]; 23,[7, 17, 0, 17]; 24,[20, 16, 18, 4]; 25,[2, 14, 4, 13]; 26,[1, 6, 7, 2]; 27,[18, 8, 6, 9]; 28,[6, 10, 12, 16]; 29,[2, 20, 11, 20]; 30,[1, 5, 12, 10]; 31,[2, 7, 10, 9]; 32,[8, 17, 11, 12]; 33,[0, 11, 12, 20]; 34,[15, 2, 0, 3]; 35,[18, 10, 10, 8]; 36,[14, 6, 17, 9]; 37,[15, 7, 3, 8]; 38,[15, 3, 6, 0]; 39,[4, 11, 2, 15]; 40,[0, 5, 1, 1]; 41,[14, 10, 15, 8]; 42,[3, 8, 18, 5]; 43,[8, 11, 0, 13]; 44,[3, 11, 13, 8]; 45,[17, 1, 4, 2]; 46,[2, 13, 2, 0]; 47,[20, 0, 16, 18]; 48,[8, 13, 15, 17]; 49,[4, 13, 8, 8]; 50,[19, 20, 17, 5]; 51,[5, 19, 8, 1]; 52,[13, 17, 4, 5]; 53,[15, 0, 16, 8]; 54,[5, 4, 1, 2]; 55,[7, 11, 0, 15]; 56,[9, 12, 4, 7]; 57,[12, 7, 8, 8]; 58,[2, 17, 12, 19]; 59,[1, 9, 3, 6]; 60,[12, 10, 8, 19]; 61,[4, 11, 11, 5]; 62,[0, 17, 17, 13]; 63,[0, 4, 12, 8]; 64,[16, 20, 11, 4]; 65,[0, 18, 20, 15]; 66,[9, 6, 11, 8]; 67,[4, 5, 15, 18]; 68,[8, 7, 19, 11]; 69,[20, 11, 5, 0]; 70,[3, 0, 2, 8]; 71,[13, 11, 0, 2]; 72,[0, 13, 5, 17]; 73,[13, 5, 0, 2]; 74,[2, 0, 17, 7]; 75,[7, 9, 16, 7]; 76,[11, 16, 8, 1]; 77,[18, 19, 12, 6]; 78,[2, 7, 20, 2]; 79,[9, 15, 19, 8]; 80,[0, 11, 12, 15]; 81,[8, 20, 4, 18]; 82,[17, 0, 20, 13]; 83,[7, 18, 0, 4]; 84,[11, 10, 8, 8]; 85,[15, 17, 1, 15]; 86,[9, 8, 7, 12]; 87,[1, 13, 11, 3]; 88,[3, 19, 11, 6]; 89,[20, 17, 0, 16]; 90,[5, 12, 17, 2]; 91,[12, 16, 0, 15]; 92,[18, 12, 8, 2]; 93,[13, 0, 0, 11]; 94,[18, 8, 4, 1]; 95,[7, 0, 5, 4]; 96,[3, 11, 20, 14]; 97,[2, 10, 18, 10]; 98,[11, 4, 0, 9]; 99,[0, 0, 17, 17]
Good luck!
```
