mod utils;

use js_sys;
use utils::set_panic_hook;
use wasm_bindgen::prelude::*;
// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub fn init() {
    set_panic_hook();
}

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet() {
    alert("Hello, backend!");
}

#[wasm_bindgen]
pub fn funny_number() -> u32 {
    69
}

#[wasm_bindgen]
pub fn get_schedule_for_display(user: String) -> String {
    return (user + "not implemented yet").to_string();
}

// I spent way too long on getting this to work...
#[wasm_bindgen]
pub fn test_js_obj(obj: JsValue) -> Result<String, JsValue> {
    let value: Result<JsValue, JsValue> = js_sys::Reflect::get(&obj, &JsValue::from_str("name"));
    if value.is_err() {
        return Err(value.err().unwrap());
    }
    let v: String = value.unwrap().as_string().unwrap();
    Ok(v)
}

#[wasm_bindgen]
pub struct TestObj {
    pub name: &str,
}
#[wasm_bindgen]
pub fn test_struct_obj(obj: TestObj) -> String {
    return obj.name.to_string();
}
