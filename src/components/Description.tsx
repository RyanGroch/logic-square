import styles from "./Description.module.css";

function Description() {
  return (
    <section className={styles.description}>
      <h2>What Is This?</h2>
      <p>
        This is a logic puzzle of my own invention, which I've uncreatively
        decided to call “LogicSquare”. It is best compared to a game like Sudoku
        - the game has a consistent set of rules, but the number of puzzles that
        can be created is immense.
      </p>
      <p>
        You can use this app to play through some puzzles yourself, or you can
        have the app solve the puzzles for you. The source code for this app can
        be found{" "}
        <a href="https://github.com/Thrasymachuss/logic-square">here</a>.
      </p>
      <h3>How To Play</h3>
      <p>
        The game consists of a 5 x 5 grid. Each of the 25 squares represents a
        logical statement about some of the other statements on the grid.
        Furthermore, each of these statements is either true or false, and the
        goal of the puzzle is to find all of the statements that are true.
      </p>
      <p>
        Each statement consists of a{" "}
        <strong>
          directional arrow (up, down, left, or right), a number (0 - 4), and a
          letter (T or F)
        </strong>
        .
      </p>
      <p>
        <strong>
          The directional arrow indicates which statement(s) the current
          statement is making a claim about.
        </strong>{" "}
        An up arrow, for instance, indicates that the statement in question is
        making a claim about all the statements that are above and in the same
        column as the statement in question. Similarly, a left arrow indicates
        that the current statement is making a claim about the statements that
        are to the left of and in the same row as the statement in question.
      </p>
      <p>
        <strong>
          The number and letter indicate how many statement(s) allegedly meet a
          specific truth value (True or False).
        </strong>{" "}
        A statement which reads “2F”, for instance, is claiming that exactly 2
        statements in the indicated direction are false. Likewise, a statement
        which reads “0T” is claiming that exactly 0 statements in the indicated
        direction are true.
      </p>
      <p>
        <strong>
          Keep in mind that every statement can be either true or false.
        </strong>{" "}
        Therefore, while a statement that reads “3T” is <em>claiming</em> that
        exactly 3 statements in the indicated direction are true, that statement
        could actually be false! If it were the case that only 2 (or 4, or 1, or
        0) statements in the indicated direction were true, for instance, then
        you should evaluate the statement as being false.
      </p>
      <p>
        <strong>
          Your objective is to find all the statements that are true and mark
          them with the color green.
        </strong>{" "}
        You can select a highlighter color from the palette just below the game
        board, and you can click on any grid square to mark it with the selected
        color. All the colors other than green are unnecessary, but you can use
        them to take notes if you wish. The built-in solver uses the red color
        to mark false statements, but this is entirely optional. A puzzle is
        considered to be solved when all of the true statements and none of the
        false statements are marked in green.
      </p>
      <h3>About The Algorithm</h3>
      <p>
        This app generates and solves puzzles using a recursive backtracking
        algorithm. The algorithm incrementally adds one piece of information at
        a time, and removes a piece of information if at any point it fails to
        satisfy the requirements of the problem.
      </p>
      <p>
        The solver moves through each statement one by one, and first assumes
        that the statement is false. Provided that this assumption does not
        violate any of the rules of the puzzle, the solver moves on to the next
        statement and makes the same assumption. When assuming a statement is
        false inevitably violates the rules of the puzzle, the solver instead
        assumes that the most recent statement it looked at is true. If this
        also fails to produce a valid solution, the solver returns to the
        previous statement, and assumes that it is true instead of false. This
        process repeats until the solver finds the correct solution.
      </p>
      <p>
        The puzzle generator works through a similar method. It first begins
        with a 5 x 5 array of true and false values. Then, it replaces each
        value one by one with a condition consisting of a direction, a number,
        and a boolean value. After replacing each value, the generator runs the
        solver to ensure that the puzzle still has only one solution. If it has
        more than one solution, the algorithm backtracks.
      </p>
      <p>
        Unfortunately, these algorithms run with an exponential time complexity.
        The generator may produce a valid puzzle in a fraction of a second, or
        it may take over an hour to complete. Keep this in mind if you are using
        the generator; you may have to refresh the page if it is taking too
        long. The solver, at worst, will only take a few minutes if you get
        unlucky.
      </p>
      <p>
        You can read more about backtracking algorithms{" "}
        <a href="https://en.wikipedia.org/wiki/Backtracking">here</a>.
      </p>
      <h3>Other Stuff I've Done</h3>
      <p>
        You can find my developer portfolio <u>here</u>, and my Github profile{" "}
        <a href="https://github.com/Thrasymachuss/">here</a>. Thanks for
        checking out my app!
      </p>
    </section>
  );
}

export default Description;
