#include <stdio.h>
#include <stdlib.h>

#define FILE_LEN 1000

static int value = 0;
static char commands[FILE_LEN];

void usage() {
    printf("usage:\n\t./mini_compiler filename\n");
}

void get_commands(char *file_name) {
    FILE *file = fopen(file_name, "r");

    int c;
    int i = 0;
    while (i < FILE_LEN && (c = fgetc(file)) != EOF) {
        commands[i++] = c;
    }

    if (c != EOF) {
        fprintf(stderr, "ERROR: limit exceeded");
        exit(1);
    }


    commands[i] = '\0';
}

void increment() {
    value++;
}

void decrement() {
    value--;
}

void multiply() {
    value *= value;
}

void print() {
    printf("%d", value);
}

/*
* "#" value + 1
* "@" value - 1
* "*" value * value
* "&" print
*/

void execute_commands() {
    int i = 0;
    while(commands[i]) {
        switch (commands[i]) {
            case '#':
                increment();
                break;

            case '@':
                decrement();
                break;

            case '*':
                multiply();
                break;

            case '&':
                print();
                break;
        }
        i++;
    }
}

int main(int argc, char **argv) {
    if (argc != 2) {
        usage();
        return 1;
    }

    get_commands(argv[1]);
    execute_commands();

    return 0;
}
