#include <stddef.h>
#include <pthread.h>
#include <emscripten.h>

typedef struct add_arg {
  int a;
  int b;
  int result;
} add_arg;

void* add(void* arg) {
  add_arg* args = (add_arg*) arg;
  args->result = args->a + args->b;
  return NULL;
}

EMSCRIPTEN_KEEPALIVE
int add_int_thread() {
  pthread_t t;
  add_arg arg = {
    .a = 1,
    .b = 2,
    .result = 0
  };
  pthread_create(&t, NULL, add, &arg);
  pthread_join(t, NULL);
  return arg.result;
}
