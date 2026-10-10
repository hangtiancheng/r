import { useCallback, useRef } from "react";

import { EditDialogs } from "@/components/dialogs/edit-dialogs";
import { ModulePanel } from "@/components/modules/module-panel";
import { ModuleSheet } from "@/components/modules/module-sheet";
import { ResumePaper } from "@/components/paper/resume-paper";
import { EditTopBar } from "@/components/toolbar/edit-top-bar";
import { ViewToolbar } from "@/components/toolbar/view-toolbar";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/toast";
import { useResumeDoc } from "@/hooks/use-resume-doc";
import { useResumeExport } from "@/hooks/use-resume-export";
import { resetResume, saveResume } from "@/lib/db";
import { parseResumeJson } from "@/lib/import";

function WorkspaceSkeleton() {
  return (
    <div className="mx-auto w-full max-w-[1120px] px-3 py-4">
      <Skeleton className="h-10 w-full rounded-t-xl" />
      <Skeleton className="h-[70dvh] w-full rounded-b-xl" />
    </div>
  );
}

export function ResumeWorkspace() {
  const {
    data,
    draft,
    editing,
    saving,
    dialog,
    setDialog,
    patchDraft,
    toggleModule,
    toggleItem,
    startEdit,
    cancelEdit,
    saveEdit,
  } = useResumeDoc();
  const paperRef = useRef<HTMLDivElement>(null);
  const { exporting, exportPdf, downloadJson } = useResumeExport(
    data,
    paperRef,
  );

  const resetDefaults = useCallback(async () => {
    await resetResume();
    cancelEdit();
    toast.add({ title: "已恢复默认简历" });
  }, [cancelEdit]);

  const importJson = useCallback(
    async (file: File) => {
      try {
        const doc = parseResumeJson(await file.text());
        await saveResume(doc);
        cancelEdit();
        toast.add({ title: "简历已导入", description: file.name });
      } catch (err) {
        toast.add({
          title: "导入失败",
          description:
            err instanceof Error ? err.message : "文件不是有效的简历 JSON",
          type: "error",
        });
      }
    },
    [cancelEdit],
  );

  if (!data) {
    return <WorkspaceSkeleton />;
  }

  return (
    <div className="app-canvas min-h-dvh px-3 py-3 md:py-5 print:p-0">
      <div className="mx-auto w-full max-w-[1120px] print:max-w-none">
        <div className="flex items-start gap-3">
          <Card className="qq-light min-w-0 flex-1 gap-0 rounded-xl py-0 shadow-[0_1px_2px_rgba(20,46,77,0.05),0_16px_40px_-16px_rgba(20,46,77,0.20)] print:rounded-none print:shadow-none print:ring-0">
            <div className="no-print">
              {editing && draft ? (
                <EditTopBar
                  title={draft.title}
                  saving={saving}
                  onTitleChange={(title) =>
                    patchDraft((d) => {
                      d.title = title;
                    })
                  }
                  onCancel={cancelEdit}
                  onSave={() => void saveEdit()}
                  actions={
                    <ModuleSheet
                      data={draft}
                      onOpen={setDialog}
                      onToggleModule={toggleModule}
                      onToggleItem={toggleItem}
                      className="xl:hidden"
                    />
                  }
                />
              ) : (
                <ViewToolbar
                  title={data.title}
                  exporting={exporting}
                  onEdit={startEdit}
                  onExportPdf={() => void exportPdf()}
                  onDownloadJson={downloadJson}
                  onImportJson={(file) => void importJson(file)}
                  onReset={() => void resetDefaults()}
                />
              )}
            </div>
            <ResumePaper
              ref={paperRef}
              data={data}
              editing={editing}
              onOpen={setDialog}
            />
          </Card>
          {editing && draft && (
            <ModulePanel
              data={draft}
              onOpen={setDialog}
              onToggleModule={toggleModule}
              onToggleItem={toggleItem}
              className="sticky top-4 hidden xl:flex"
            />
          )}
        </div>
      </div>
      {editing && draft && (
        <EditDialogs
          dialog={dialog}
          setDialog={setDialog}
          draft={draft}
          patchDraft={patchDraft}
        />
      )}
    </div>
  );
}
