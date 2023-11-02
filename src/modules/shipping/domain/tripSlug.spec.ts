// import { TripSlug } from "./tripSlug";
// import { Result } from "../../../shared/core/Result";
// import { TripTitle } from "./tripTitle";

// let tripSlug: TripSlug;
// let tripSlugOrError: Result<TripSlug>;
// let tripTitle: TripTitle;
// let tripTitleOrError: Result<TripTitle>;

// test("Should be able to create a post slug", () => {
//   tripTitleOrError = TripTitle.create({ value: "HTML Developers" });
//   expect(tripTitleOrError.isSuccess).toBe(true);
//   tripTitle = tripTitleOrError.getValue();
//   tripSlugOrError = TripSlug.create(tripTitle);
//   expect(tripSlugOrError.isSuccess).toBe(true);
//   tripSlug = tripSlugOrError.getValue();
//   expect(tripSlug.value).toContain("html-developers");
// });

// test("Should be able to parse out any bad characters not suitable for a slug", () => {
//   tripTitleOrError = TripTitle.create({ value: "K^ha^l#il^^#'s Job" });
//   expect(tripTitleOrError.isSuccess).toBe(true);
//   tripTitle = tripTitleOrError.getValue();
//   tripSlugOrError = TripSlug.create(tripTitle);
//   expect(tripSlugOrError.isSuccess).toBe(true);
//   tripSlug = tripSlugOrError.getValue();
//   expect(tripSlug.value).toContain("khalils-job");
// });
