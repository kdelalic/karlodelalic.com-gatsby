rm -f static/resume.pdf && \

git submodule update --init --recursive --remote && \

mv src/resume/resume.pdf static/resume.pdf
