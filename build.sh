rm -f static/resume.pdf && \

git submodule update --init --remote src/resume && \

mv src/resume/resume.pdf static/resume.pdf
