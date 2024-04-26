# Contributions

... are most welcome!

More _complex_ ones should be (preferably!) as a Pull Request (PR) on GitHub.

And don't forget to (automatically) add yourself as a contributor: https://allcontributors.org/docs/en/bot/usage

## Trivia

I used to zip things properly (on a Mac) with:

`zip postlocalstorage.zip -9 -x \*/.DS_Store -r gwynethllewelyn/`

However, since having found that GitHub _will_ deal with automatically creating the zip file *without* even needing an intermediate step when packaging everything together. My new command is now:

`git archive -9 -o postlocalstorage.zip HEAD gwynethllewelyn/** `

It's still somewhat experimental, though...