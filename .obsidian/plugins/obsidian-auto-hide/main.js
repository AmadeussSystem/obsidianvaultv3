/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => AutoHidePlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");
var DEFAULT_SETTINGS = {
  expandSidebar_onClickRibbon: false,
  expandSidebar_onClickNoteTitle: false,
  lockSidebar: false,
  leftPinActive: false,
  rightPinActive: false
};
var AutoHidePlugin = class extends import_obsidian.Plugin {
  onload() {
    return __async(this, null, function* () {
      yield this.loadSettings();
      this.addSettingTab(new AutoHideSettingTab(this.app, this));
      (0, import_obsidian.addIcon)("oah-pin", `<g transform="matrix(.87777 .88112 -.87777 .88112 43.03 -31.116)" style="fill:none"><g transform="translate(3.0597 -.53266)" stroke="currentColor" stroke-linejoin="round" stroke-width="3" style="fill:none"><path d="m27.884 53.709c-2.1049-8.9245 4.547-11.436 9.5283-14.888l1.5881-23.821c-7.9403-1.4888-7.9403-2.3554-7.9403-8.9328h31.761c0 6.5774 0 7.444-7.9403 8.9328l1.5881 23.821c4.9814 3.4517 11.633 5.9636 9.5283 14.888l-19.057 1.4e-5z" style="fill:none"/><path d="m43.764 53.709v33.349l3.1761 7.9403 3.1761-7.9403v-33.349" style="fill:none"/></g></g>`);
      (0, import_obsidian.addIcon)("oah-filled-pin", `<g transform="matrix(.87777 .88112 -.87777 .88112 43.03 -31.116)"><g transform="translate(3.0597 -.53266)" stroke="currentColor" fill="currentColor" stroke-linejoin="round" stroke-width="3"><path d="m27.884 53.709c-2.1049-8.9245 4.547-11.436 9.5283-14.888l1.5881-23.821c-7.9403-1.4888-7.9403-2.3554-7.9403-8.9328h31.761c0 6.5774 0 7.444-7.9403 8.9328l1.5881 23.821c4.9814 3.4517 11.633 5.9636 9.5283 14.888l-19.057 1.4e-5z"/><path d="m43.764 53.709v33.349l3.1761 7.9403 3.1761-7.9403v-33.349"/></g></g>`);
      this.app.workspace.onLayoutReady(() => {
        this.init();
        this.registerEvents();
        this.togglePins();
      });
      this.app.workspace.on("layout-change", () => {
        this.init();
        this.togglePins();
        if (this.settings.leftPinActive) {
          this.leftSplit.expand();
        }
        if (this.settings.rightPinActive) {
          this.rightSplit.expand();
        }
      });
    });
  }
  onunload() {
    this.removePins();
  }
  loadSettings() {
    return __async(this, null, function* () {
      this.settings = Object.assign({}, DEFAULT_SETTINGS, yield this.loadData());
    });
  }
  saveSettings() {
    return __async(this, null, function* () {
      yield this.saveData(this.settings);
    });
  }
  init() {
    this.leftSplit = this.app.workspace.leftSplit;
    this.rightSplit = this.app.workspace.rightSplit;
    this.rootSplitEl = this.app.workspace.rootSplit.containerEl;
    this.leftRibbonEl = this.app.workspace.leftRibbon.containerEl;
    this.rightRibbonEl = this.app.workspace.rightRibbon.containerEl;
  }
  registerEvents() {
    this.registerDomEvent(this.app.workspace.containerEl, "click", (evt) => {
      if (!this.rootSplitEl.contains(evt.target)) {
        return;
      }
      if (evt.target.closest(".workspace-tab-header-container") !== null) {
        return;
      }
      if (evt.target.classList.contains("cm-hashtag") || evt.target.classList.contains("tag")) {
        return;
      }
      if (evt.target.closest(".multi-select-pill-content") !== null) {
        return;
      }
      const preventsClassList = ["snw-reference"];
      if (preventsClassList.some((e) => evt.target.classList.contains(e))) {
        return;
      }
      if (evt.target.classList.contains("view-header-breadcrumb")) {
        return;
      }
      if (evt.target.classList.contains("view-header-title") && this.settings.expandSidebar_onClickNoteTitle) {
        if (this.leftSplit.collapsed == true)
          this.leftSplit.expand();
        return;
      }
      if (!this.settings.leftPinActive) {
        this.leftSplit.collapse();
      }
      if (!this.settings.rightPinActive) {
        this.rightSplit.collapse();
      }
    });
    this.registerDomEvent(this.leftRibbonEl, "click", (evt) => {
      if (this.settings.expandSidebar_onClickRibbon) {
        if (evt.target == this.leftRibbonEl) {
          if (this.leftSplit.collapsed == true)
            this.leftSplit.expand();
        }
      }
    });
    this.registerDomEvent(this.rightRibbonEl, "click", (evt) => {
      if (this.settings.expandSidebar_onClickRibbon) {
        if (evt.target == this.rightRibbonEl) {
          if (this.rightSplit.collapsed == true)
            this.rightSplit.expand();
        }
      }
    });
  }
  togglePins() {
    if (!this.settings.lockSidebar) {
      this.removePins();
      return;
    }
    if (document.getElementsByClassName("auto-hide-button").length == 0) {
      this.addPins();
    }
  }
  addPins() {
    const tabHeaderContainers = document.getElementsByClassName("workspace-tab-header-container");
    const lb = new import_obsidian.ButtonComponent(tabHeaderContainers[0]).setIcon(this.settings.leftPinActive ? "oah-filled-pin" : "oah-pin").setClass("auto-hide-button").onClick(() => __async(this, null, function* () {
      this.settings.leftPinActive = !this.settings.leftPinActive;
      yield this.saveSettings();
      if (this.settings.leftPinActive) {
        lb.setIcon("oah-filled-pin");
      } else {
        lb.setIcon("oah-pin");
      }
    }));
    const rb = new import_obsidian.ButtonComponent(tabHeaderContainers[2]).setIcon(this.settings.rightPinActive ? "oah-filled-pin" : "oah-pin").setClass("auto-hide-button").onClick(() => __async(this, null, function* () {
      this.settings.rightPinActive = !this.settings.rightPinActive;
      yield this.saveSettings();
      if (this.settings.rightPinActive) {
        rb.setIcon("oah-filled-pin");
      } else {
        rb.setIcon("oah-pin");
      }
    }));
  }
  removePins() {
    const pins = document.getElementsByClassName("auto-hide-button");
    while (pins.length) {
      if (pins.item(0) != null) {
        pins[0].remove();
      }
    }
  }
};
var AutoHideSettingTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "Settings for Auto Hide plugin." });
    new import_obsidian.Setting(containerEl).setName("Expand the sidebar with a ribbon").setDesc("Click on the blank area of ribbon to expand the sidebar.").addToggle((toggle) => toggle.setValue(this.plugin.settings.expandSidebar_onClickRibbon).onChange((value) => __async(this, null, function* () {
      this.plugin.settings.expandSidebar_onClickRibbon = value;
      yield this.plugin.saveSettings();
    })));
    new import_obsidian.Setting(containerEl).setName("Expand the sidebar with a note title").setDesc("Click on the note title to expand the left sidebar.").addToggle((toggle) => toggle.setValue(this.plugin.settings.expandSidebar_onClickNoteTitle).onChange((value) => __async(this, null, function* () {
      this.plugin.settings.expandSidebar_onClickNoteTitle = value;
      yield this.plugin.saveSettings();
    })));
    containerEl.createEl("h4", { text: "EXPERIMENTAL!" });
    new import_obsidian.Setting(containerEl).setName("Lock sidebar collapse").setDesc("Add a pin that can temporarily lock the sidebar collapse.").addToggle((toggle) => toggle.setValue(this.plugin.settings.lockSidebar).onChange((value) => __async(this, null, function* () {
      this.plugin.settings.lockSidebar = value;
      yield this.plugin.saveSettings();
      this.plugin.togglePins();
    })));
  }
};

/* nosourcemap */