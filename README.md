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
0,[1, 18, 1, 0]; 1,[8, 10, 2, 19]; 2,[0, 8, 18, 11]; 3,[0, 5, 3, 16]; 4,[13, 3, 0, 0]; 5,[19, 12, 13, 4]; 6,[4, 0, 16, 13]; 7,[4, 2, 18, 16]; 8,[4, 1, 2, 2]; 9,[19, 13, 3, 10]; 10,[9, 14, 20, 8]; 11,[6, 6, 2, 12]; 12,[4, 3, 5, 0]; 13,[14, 15, 1, 2]; 14,[18, 1, 19, 19]; 15,[3, 5, 20, 7]; 16,[1, 1, 16, 5]; 17,[13, 7, 20, 13]; 18,[16, 9, 4, 18]; 19,[5, 4, 16, 13]; 20,[4, 7, 0, 19]; 21,[18, 17, 0, 6]; 22,[20, 17, 9, 7]; 23,[18, 16, 0, 1]; 24,[12, 15, 2, 19]; 25,[6, 10, 19, 19]; 26,[20, 5, 9, 6]; 27,[12, 9, 20, 13]; 28,[7, 17, 3, 20]; 29,[10, 16, 12, 3]; 30,[16, 11, 6, 12]; 31,[17, 13, 12, 0]; 32,[13, 0, 2, 10]; 33,[1, 2, 8, 17]; 34,[20, 1, 6, 11]; 35,[12, 1, 13, 2]; 36,[11, 5, 3, 9]; 37,[18, 12, 20, 12]; 38,[16, 19, 2, 13]; 39,[1, 0, 0, 12]; 40,[19, 5, 3, 15]; 41,[9, 9, 0, 1]; 42,[19, 20, 20, 4]; 43,[19, 6, 0, 18]; 44,[17, 1, 19, 3]; 45,[8, 13, 3, 4]; 46,[11, 4, 0, 3]; 47,[2, 2, 0, 3]; 48,[4, 1, 6, 3]; 49,[19, 3, 18, 20]; 50,[12, 15, 3, 1]; 51,[8, 3, 0, 1]; 52,[12, 17, 9, 4]; 53,[13, 12, 20, 18]; 54,[1, 12, 20, 10]; 55,[4, 12, 0, 19]; 56,[3, 20, 1, 6]; 57,[15, 16, 15, 16]; 58,[12, 3, 1, 15]; 59,[9, 11, 18, 3]; 60,[1, 13, 5, 4]; 61,[3, 18, 3, 17]; 62,[15, 0, 6, 8]; 63,[8, 0, 0, 16]; 64,[8, 19, 2, 17]; 65,[0, 7, 3, 4]; 66,[14, 2, 9, 20]; 67,[7, 19, 20, 6]; 68,[7, 0, 12, 15]; 69,[0, 7, 19, 7]; 70,[20, 14, 19, 18]; 71,[4, 17, 1, 0]; 72,[6, 5, 10, 16]; 73,[1, 8, 19, 17]; 74,[19, 9, 13, 1]; 75,[0, 19, 18, 10]; 76,[1, 0, 11, 5]; 77,[12, 15, 6, 8]; 78,[3, 3, 2, 9]; 79,[7, 7, 2, 1]; 80,[2, 0, 15, 7]; 81,[8, 2, 3, 15]; 82,[14, 16, 11, 9]; 83,[0, 9, 6, 19]; 84,[9, 11, 4, 7]; 85,[20, 13, 0, 10]; 86,[0, 1, 19, 0]; 87,[3, 9, 12, 19]; 88,[10, 14, 6, 0]; 89,[20, 11, 0, 4]; 90,[3, 1, 0, 2]; 91,[1, 3, 18, 10]; 92,[16, 7, 8, 10]; 93,[2, 7, 11, 3]; 94,[0, 7, 15, 10]; 95,[10, 13, 19, 5]; 96,[1, 18, 0, 11]; 97,[7, 17, 13, 9]; 98,[4, 18, 15, 8]; 99,[13, 2, 19, 0]
Good luck!
```
