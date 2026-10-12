import { uid } from "@/lib/format";
import type {
  EduItem,
  HonorItem,
  ProjectItem,
  WorkDetail,
  WorkItem,
} from "@/lib/types";

export function newWorkDetail(): WorkDetail {
  return { id: uid(), title: "", content: "" };
}

export function newEduItem(): EduItem {
  return {
    id: uid(),
    start: "",
    end: "",
    ongoing: false,
    school: "",
    major: "",
    degree: "本科",
    gpa: "",
    rank: "",
  };
}

export function newWorkItem(): WorkItem {
  return {
    id: uid(),
    start: "",
    end: "",
    ongoing: false,
    company: "",
    department: "",
    position: "",
    details: [newWorkDetail()],
  };
}

export function newProjectItem(): ProjectItem {
  return {
    id: uid(),
    start: "",
    end: "",
    ongoing: false,
    name: "",
    duty: "",
    repo: "",
    content: "",
  };
}

export function newHonorItem(): HonorItem {
  return { id: uid(), name: "", issuer: "", date: "" };
}
