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
      <h3>Other Stuff I've Done</h3>
      <p>
        You can find my developer portfolio{" "}
        <a href="https://thrasymachuss.github.io/portfolio/">here</a>, and my
        Github profile <a href="https://github.com/Thrasymachuss/">here</a>.
        Thanks for checking out my app!
      </p>
    </section>
  );
}

export default Description;
