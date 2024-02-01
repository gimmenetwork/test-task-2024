<template>
  <div class="bg-gray-50">
    <div
      class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col"
    >
      <div
        class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4"
      >
        <div class="flex h-16 shrink-0 items-center">
          <img
            class="h-14 p-2 w-auto m-auto mt-5 cursor-pointer border rounded-full bg-white"
            src="@/assets/images/logo.png"
            alt="Your Company"
            @click="navigateTo('/mainPage')"
          />
        </div>
        <nav class="flex flex-1 flex-col">
          <ul role="list" class="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" class="-mx-2 space-y-1">
                <li v-for="item in navigation" :key="item.name">
                  <a
                    @click="
                      wasClicked($event, item), showChildren($event, item)
                    "
                    :href="item.href"
                    :class="itemClasses(item)"
                  >
                    <component
                      :is="item.icon"
                      class="h-6 w-6 shrink-0"
                      aria-hidden="true"
                    />
                    {{ $t(item.name) }}
                  </a>
                  <ul
                    v-show="showMeChildren === navigation.indexOf(item)"
                    class="-mx-2"
                  >
                    <li v-for="child in item.children" :key="child.name">
                      <a
                        :href="child.href"
                        :class="[
                          child.current
                            ? 'bg-gray-800 text-white'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800 hover:scale-105 transactions transition-all duration-300',
                          'group flex gap-x-3 rounded-md p-2 pl-14 leading-6 font-semibold',
                        ]"
                      >
                        <component
                          :is="child.icon"
                          class="h-6 w-6 shrink-0"
                          aria-hidden="true"
                        />
                        • {{ $t(child.name) }}
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <div class="font-semibold leading-6 text-gray-400"></div>
              <!-- <ul role="list" class="-mx-2 space-y-1">
                <li v-for="team in teams" :key="team.name">
                  <a
                    :href="team.href"
                    :class="[
                      team.current
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800 hover:scale-105 transactions transition-all duration-300',
                      'group flex gap-x-3 rounded-md p-2 leading-6 font-semibold',
                    ]"
                  >
                    <span
                      class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white"
                      >{{ $t(team.initial) }}
                    </span>
                    <span class="truncate">{{ $t(team.name) }} </span>
                  </a>
                </li>
              </ul> -->
            </li>
            <li class="mt-auto">
              <a
                href="#"
                class="group -mx-2 flex gap-x-3 rounded-md p-2 font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
              >
                <Cog6ToothIcon class="h-6 w-6 shrink-0" aria-hidden="true" />
                {{ $t("logOut") }}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <div class="lg:pl-72">
      <div
        class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8"
      >
        <button
          type="button"
          class="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          @click="sidebarOpen = true"
        >
          <span class="sr-only">Open sidebar</span>
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>

        <div class="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

        <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 justify-end">
          <div class="flex items-center gap-x-4 lg:gap-x-6">
            <form class="border">
              <select v-model="locale" @change="changeLanguage(locale)">
                <option value="en">EN</option>
                <option value="de">DE</option>
                <option value="es">ES</option>
                <option value="ru">RU</option>
                <option value="az">AZ</option>
                <option value="tr">TR</option>
                <option value="uk">UK</option>
              </select>
            </form>
            <button
              type="button"
              class="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
            >
              <span class="sr-only">View notifications</span>
            </button>
            <div
              class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
              aria-hidden="true"
            />

            <Menu as="div" class="relative">
              <MenuButton
                class="-m-1.5 flex items-center p-1.5 cursor-pointer"
                @click="showUserNavigation = !showUserNavigation"
              >
                <span class="sr-only">Open user menu</span>
                <img
                  class="h-8 w-8 rounded-full bg-gray-50"
                  src="@/assets/images/stupak.jpeg"
                  alt=""
                />
                <span
                  class="hidden lg:flex lg:items-center hover:scale-105 transactions transition-all duration-300"
                >
                  <span
                    class="ml-4 font-semibold leading-6 text-gray-900"
                    aria-hidden="true"
                    >Kostiantyn Stupak</span
                  >
                </span>
              </MenuButton>
              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems
                  class="absolute right-0 z-10 mt-5 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                  v-if="showUserNavigation"
                >
                  <MenuItem v-for="item in userNavigation" :key="item.name">
                    <a
                      :href="item.href"
                      @click="item.onClick ? item.onClick() : null"
                      :class="[
                        active ? 'bg-gray-50' : '',
                        'block leading-6 p-2 text-gray-900 hover:bg-gray-700 hover:text-white hover:border-gray-400 rounded-sm transactions transition-all duration-300',
                      ]"
                      >{{ $t(navigation[3].name) }}</a
                    >
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>

      <main class="">
        <div class="px-4 sm:px-6 lg:px-8"></div>
      </main>
    </div>
    <slot />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { MenuItems } from "@headlessui/vue";
import { Menu } from "@headlessui/vue";
import { MenuItem } from "@headlessui/vue";
import { MenuButton } from "@headlessui/vue";
import {
  Bars3Icon,
  Cog6ToothIcon,
  HomeIcon,
  ChevronDownIcon,
  ArchiveBoxIcon,
  UserIcon,
} from "@heroicons/vue/24/outline";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const { locale, setLocale } = useI18n();

const sidebarOpen = ref(false);
const showMeChildren = ref(false);
const showUserNavigation = ref(false);
const active = ref(false);
const user = useSupabaseUser();
const supabase = useSupabaseClient();

const logout = async () => {
  console.log("Logout function called");
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error signing out:", error.message);
    return;
  }

  try {
    await $fetch("/api/_supabase/session", {
      method: "POST",
      body: { event: "SIGNED_OUT", session: null },
    });
  } catch (error) {
    console.error("Error updating session:", error);
  }
  user.value = null;
  navigateTo("/");
};

const navigation = [
  {
    name: "dashboard",
    href: "/MainPage",
    icon: HomeIcon,
    current: false,
  },
  {
    name: "myAccount",
    href: "#",
    icon: UserIcon,
    current: false,
    children: [
      { name: "allBooks", href: "/listofbooks" },
      { name: "readBooks", href: "/readbooks" },
    ],
  },
  {
    name: "addNewBook",
    href: "/addnewbook",
    icon: ArchiveBoxIcon,
    current: false,
  },
];
// const teams = [
//   { id: 1, name: "search", href: "#", initial: "lupa", current: false },
//   { id: 2, name: "msgs", href: "#", initial: "sent", current: false },
//   { id: 3, name: "FAQ", href: "#", initial: "ask", current: false },
// ];

const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: "#", onClick: logout },
];

const showChildren = (event, item) => {
  event.preventDefault();
  if (showMeChildren.value === navigation.indexOf(item)) {
    showMeChildren.value = false;
    navigateTo(item.href);
  } else {
    showMeChildren.value = navigation.indexOf(item);
    navigateTo(item.href);
  }
};

const wasClicked = (event, item) => {
  event.preventDefault();
  item.current = true;
  navigation.forEach((navItem) => {
    if (navItem !== item) {
      navItem.current = false;
    }
  });
  navigateTo(item.href);
};

const itemClasses = (item) => {
  return [
    item.current
      ? "bg-gray-800 text-white"
      : "text-gray-400 hover:text-white hover:bg-gray-800 hover:scale-105 transactions transition-all duration-300",
    "group flex gap-x-3 rounded-md p-2 leading-6 font-semibold",
  ];
};

if (typeof localStorage !== "undefined") {
  const storedLanguage = localStorage.getItem("language");
  if (storedLanguage) {
    setLocale(storedLanguage);
  } else {
    setLocale("en");
  }
}

const changeLanguage = (newLanguage) => {
  setLocale(newLanguage);
  localStorage.setItem("language", newLanguage);
};

onMounted(() => {
  const currentPath = window.location.pathname;
  navigation.forEach((item) => {
    item.current = item.href === currentPath;
  });
});
</script>

<style>
* {
  font-family: "Cormorant", serif;
}
</style>
